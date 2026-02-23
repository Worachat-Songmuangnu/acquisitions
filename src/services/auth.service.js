import bcrypt from 'bcrypt';
import logger from '../config/logger.js';
import {db} from "../config/database.js";
import { user } from '../models/user.model.js';
import { eq } from 'drizzle-orm';

export const hashPassword = async password => {
  try {
    return bcrypt.hash(password, 10);
  } catch(e) {
    logger.error("Hash Password Error", e);
    throw new Error("Error hashing password");
  }
};

export const createUser = async ({ name, email, password, role = 'user' }) => {
  try {
   const existingUser = await db.select().from(user).where(eq(user.email, email)).limit(1);
   if (existingUser.length > 0) {
    throw new Error("User already exists");
   }
    const hashedPassword = await hashPassword(password);
    const [newUser] = await db
    .insert(user)
    .values({name,email,password: hashedPassword,role})
    .returning({ 
        id: user.id, name: user.name, email: user.email, role: user.role, create_at: user.create_at });
    logger.info(`User created successfully: ${email}`);
    return newUser;
} catch(e) {
    logger.error("Create User Error", e);
    throw e;
  }
};
