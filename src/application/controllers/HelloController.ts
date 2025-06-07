import z from 'zod';
import { Controller } from '../contracts/Controller';
import { helloSchema } from './schemas/helloSchema';
import { Schema } from '../../kernel/decorators/Schema';

@Schema(helloSchema)
export class HelloController extends Controller<unknown> {
  protected override schema = helloSchema;

  protected override async handle(
    request: Controller.Request<HelloBody>)
    : Promise<Controller.Response<unknown>> {
    return {
      statusCode: 200,
      body: {
        parsedBody: request.body,
      },
    };
  }
}

export type HelloBody = z.infer<typeof helloSchema>;
