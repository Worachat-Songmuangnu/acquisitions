import jwt from 'jsonwebtoken';
import logger from '../config/logger';

const JWT_SECRET = process.env.JWT_SECRET || 'secret-key';
const JWT_EXPIRES_IN = '1d';

export const jwtoken = payload => {
  sign: (payload) => {
    try {
      return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    } catch (error) {
      logger.error('Error signing JWT:', error);
      throw new Error('Failed to sign JWT');
    }

    verify: (token) => {
      try {
        return jwt.verify(token, JWT_SECRET);
      } catch (error) {
        logger.error('Error verifying JWT:', error);
        throw new Error('Failed to verify JWT');
      }
    };
  };
};
