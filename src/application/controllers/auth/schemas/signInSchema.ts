import { z } from 'zod';

export const signInSchema = z.object({
    email: z.string().email('Email is required'),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
});

export type SignInBody = z.infer<typeof signInSchema>;
