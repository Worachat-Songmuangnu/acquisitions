import {z} from 'zod';
export const signUpSchema = z.object({
    name: z.string().trim().min(2).max(255),
    email: z.email().toLowerCase().trim(),
    password: z.string().min(1).max(255).trim(),
    role: z.enum(['admin', 'user']).default('user'),});

export const signInSchema = z.object({
    email: z.email().toLowerCase().trim(),
    password: z.string().min(1),
});

