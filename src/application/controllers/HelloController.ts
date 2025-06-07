
import { IController } from '../contracts/Controller';

export class HelloController implements IController<unknown> {
  async handle(request: IController.Request<unknown>): Promise<IController.Response<unknown>> {
    return {
      statusCode: 200,
      body: {
        deuBom: 'deu bom',
        request,
      },
    };
  }
}
