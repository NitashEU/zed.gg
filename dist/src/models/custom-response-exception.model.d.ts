import { HttpStatusCode } from './../enums/http-status-code.enum';
export declare class CustomResponseException {
    requestUrl: string;
    date: Date;
    statusCode: HttpStatusCode;
    headers: {
        key: string;
        value: string;
    }[];
    constructor(requestUrl: string, date: Date, statusCode: HttpStatusCode, headers: {
        key: string;
        value: string;
    }[]);
}
