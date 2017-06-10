import { HttpStatusCode } from './../enums/http-status-code.enum';
export declare class CustomResponse {
    body: string;
    statusCode: HttpStatusCode;
    headers: {
        key: string;
        value: string;
    }[];
    constructor(body: string, statusCode: HttpStatusCode, headers: {
        key: string;
        value: string;
    }[]);
}
