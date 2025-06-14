import { Controller } from '@application/contracts/Controller';
import { Schema } from '@kernel/decorators/Schema';
import { SignUpBody, signUpSchema } from './schemas/signUpSchema';
import { SignUpUseCase } from '@application/usecases/auth/SignUpUseCase';
import { Injectable } from '@kernel/decorators/Injectable';

@Injectable()
@Schema(signUpSchema)
export class SignUpController extends Controller<SignUpController.Response> {
  constructor(private readonly signUpUseCase: SignUpUseCase) {
    super();
  }

  protected override async handle(
    { body }: Controller.Request<SignUpBody>)
    : Promise<Controller.Response<SignUpController.Response>> {
      const { email, password } = body.account;

      const result = await this.signUpUseCase.execute({
        email,
        password,
      });

    return {
      statusCode: 201,
      body: {
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
      },
    };
  }
}

export namespace SignUpController {
  export type Response = {
    accessToken: string;
    refreshToken: string;
  }
}

