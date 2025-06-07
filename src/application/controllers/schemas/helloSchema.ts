import { z } from 'zod';

export const helloSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Email is required'),
});
