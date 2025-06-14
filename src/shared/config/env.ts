import { z, ZodError } from 'zod';

const schema = z.object({
    COGNITO_CLIENT_ID: z.string().min(1, 'COGNITO_CLIENT_ID is required'),
});

function getEnv() {
    try {
        return schema.parse(process.env);
    }
    catch (error) {
        if (error instanceof ZodError) {
            throw new Error(JSON.stringify(error));
        }

        throw error;
    }
}

export const env = getEnv();

