import { ErrorCode } from '@application/errors/ErrorCode';
import { HttpError } from '@application/errors/http/HttpError';

export class BadRequest extends HttpError {
    public override statusCode: number;
    public override code: ErrorCode;

    constructor(message?: any, code?: ErrorCode) {
        super();
        this.message = message ?? 'Bad Request';
        this.name = 'BadRequest';
        this.statusCode = 400;
        this.code = code ?? ErrorCode.BAD_REQUEST;
    }
}	
