import { HttpStatusCode } from './../enums/http-status-code.enum';
export declare class CustomResponse {
    body: string;
    date: Date;
    statusCode: HttpStatusCode;
    headers: {
        key: string;
        value: string;
    }[];
    constructor(body: string, date: Date, statusCode: HttpStatusCode, headers: {
        key: string;
        value: string;
    }[]);
}
