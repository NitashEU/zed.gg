import * as request from 'request';

import { CustomResponse } from './../models/custom-response.model';
import { CustomResponseException } from './../models/custom-response-exception.model';

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
    return new Promise<CustomResponse>((resolve, reject) => {
      this.baseRequest.get(url, options, (err, data) => {
        if (err || data.statusCode >= 400) {
          reject(new CustomResponseException(this.baseOptions.baseUrl + url, data.statusCode, data.headers));
        }
        else {
          resolve(new CustomResponse(data.body, data.statusCode, data.headers));
        }
      });
    });
  }
}