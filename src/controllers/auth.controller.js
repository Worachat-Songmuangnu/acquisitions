import jwttoken from 'jsonwebtoken';
import logger from '../config/logger.js';
import { signUpSchema } from '../validations/auth.validation.js';
import { formatValidationErrors } from '../utils/format.js';
import { createUser } from '../services/auth.service.js';
import { cookies } from '../utils/cookies.js';
export const signUp = async (req, res, next) => {
  try {
    const validationResult = signUpSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({
        error: 'Validation Error',
        details: formatValidationErrors(validationResult.error),
      });
    }
    const { name, email, password, role } = validationResult.data;
    const user = await createUser({ name, email, password, role });

    const token = jwttoken.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET);
    cookies.set(res, 'token', token);

    logger.info(`User registered successfully: ${email}`);
    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (e) {
    logger.error('Sign Up Error', e);

    if (e.message === 'User already exists') {
      return res.status(409).json({ message: e.message });
    }
    next(e);
  }
};
