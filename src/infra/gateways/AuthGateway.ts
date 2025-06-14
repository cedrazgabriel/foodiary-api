import { SignUpCommand } from '@aws-sdk/client-cognito-identity-provider';
import { Injectable } from '@kernel/decorators/Injectable';
import { cognitoClient } from '../clients/cognitoClient';
import { AppConfig } from '@shared/config/AppConfig';

@Injectable()
export class AuthGateway {
    constructor(private readonly appConfig: AppConfig) { }
    async signUp(
        { email, password }: AuthGateway.SignUpParams,
    ): Promise<AuthGateway.SignUpOutput> {
        const command = new SignUpCommand({
            ClientId: this.appConfig.auth.cognito.clientId,
            Username: email,
            Password: password,
        });

        const { UserSub } = await cognitoClient.send(command);

        if (!UserSub) {
            throw new Error(`Cannot sign up user: ${email}`);
        }

        return {
            externalId: UserSub,
        };
    }
}

export namespace AuthGateway {
    export type SignUpParams = {
        email: string;
        password: string;
    }

    export type SignUpOutput = {
        externalId: string;
    }

}
