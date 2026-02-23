import logger from '../config/logger.js';
import { signUpSchema } from '../validations/auth.validation.js';
import { formatValidationErrors } from '../utils/format.js';
export const signUp = async (req, res , next) => { 
    try {
        const validationResult = signUpSchema.safeParse(req.body);
        if (!validationResult.success) {
            return res.status(400).json({ 
                error: "Validation Error",
                details: formatValidationErrors(validationResult.error),
             });
        }
        const { name, email, password, role } = validationResult.data;

        logger.info(`User registered successfully: ${email}`);
        res.status(201).json({ 
            message: "User registered successfully",
            user: {
                name,
                email,
                role
            }
        });

    }
    catch (e) {
        logger.error("Sign Up Error",e);

        if (e.message === "User already exists") {
            return res.status(409).json({ message: e.message });
        }
        next(e);
    }

}