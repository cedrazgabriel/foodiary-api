
import { z } from 'zod';
import { Controller, IController } from '../contracts/Controller';

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Email is required'),
});

export class HelloController extends Controller<unknown> {
  async handle(request: IController.Request<unknown>): Promise<IController.Response<unknown>> {
    const parsedBody = schema.parse(request.body);

    return {
      statusCode: 200,
      body: {
        parsedBody,
      },
    };
  }
}
