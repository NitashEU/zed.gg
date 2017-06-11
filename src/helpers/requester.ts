import * as request from 'request';

import { CustomResponse, CustomResponseException } from './../models';

import { HttpStatusCode } from './../enums'

export class Requester {
  private baseRequest: request.RequestAPI<request.Request, request.CoreOptions, request.RequiredUriUrl>;
  private baseOptions: request.CoreOptions;

  constructor(baseOptions?: request.CoreOptions) {
    baseOptions = !baseOptions
      ? {}
      : baseOptions;
    this.baseOptions = baseOptions;
    this.baseRequest = request.defaults(baseOptions);
  }

  public get(url: string, options?: request.CoreOptions): Promise<CustomResponse> {
    let date = new Date();
    return new Promise<CustomResponse>((resolve, reject) => {
      this.baseRequest.get(url, options, (err, data) => {
        let path = (data.request as any).path;
        if (err || (!!data.statusCode && data.statusCode >= 400)) {
          reject(new CustomResponseException(this.baseOptions.baseUrl + path, date, data.statusCode as HttpStatusCode, data.headers));
        }
        else {
          resolve(new CustomResponse(data.body, date, data.statusCode as HttpStatusCode, data.headers));
        }
      });
    });
  }
}