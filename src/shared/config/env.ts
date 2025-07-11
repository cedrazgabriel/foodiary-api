import { z } from 'zod';

const schema = z.object({
    COGNITO_CLIENT_ID: z.string().min(1, 'COGNITO_CLIENT_ID is required'),
    COGNITO_CLIENT_SECRET: z.string().min(1, 'COGNITO_CLIENT_SECRET is required'),
    MAIN_TABLE_NAME: z.string().min(1, 'MAIN_TABLE_NAME is required'),
});

export const env = schema.parse(process.env);

