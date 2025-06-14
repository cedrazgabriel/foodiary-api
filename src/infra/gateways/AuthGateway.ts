import { InitiateAuthCommand, SignUpCommand } from '@aws-sdk/client-cognito-identity-provider';
import { Injectable } from '@kernel/decorators/Injectable';
import { cognitoClient } from '../clients/cognitoClient';
import { AppConfig } from '@shared/config/AppConfig';

@Injectable()
export class AuthGateway {
    constructor(private readonly appConfig: AppConfig) { }

    async signIn(
        { email, password }: AuthGateway.SignInParams,
    ): Promise<AuthGateway.SignInOutput> {
        const command = new InitiateAuthCommand({
            AuthFlow: 'USER_PASSWORD_AUTH',
            ClientId: this.appConfig.auth.cognito.clientId,
            AuthParameters: {
                USERNAME: email,
                PASSWORD: password,
            },
        });

        const { AuthenticationResult } = await cognitoClient.send(command);

        if (!AuthenticationResult?.AccessToken || !AuthenticationResult?.RefreshToken) {
            throw new Error(`Cannot authenticate user: ${email}`);
        }

        return {
            accessToken: AuthenticationResult.AccessToken,
            refreshToken: AuthenticationResult.RefreshToken,
        };
    }

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

    export type SignInParams = {
        email: string;
        password: string;
    }

    export type SignInOutput = {
        accessToken: string;
        refreshToken: string;
    }

}
