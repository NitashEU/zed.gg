/// <reference types="request" />
import * as request from 'request';
import { CustomResponse } from './../models/custom-response.model';
export declare class Requester {
    private baseRequest;
    private baseOptions;
    constructor(baseOptions?: request.CoreOptions);
    get(url: string, options?: request.CoreOptions): Promise<CustomResponse>;
}
