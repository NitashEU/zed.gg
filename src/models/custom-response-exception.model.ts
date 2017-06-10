import { HttpStatusCode } from './../enums/http-status-code.enum';

export class CustomResponseException {
  public requestUrl: string;
  public statusCode: HttpStatusCode;
  public headers: { key: string, value: string }[];

  constructor(requestUrl: string, statusCode: HttpStatusCode, headers: { key: string, value: string }[]) {
    this.requestUrl = requestUrl;
    this.statusCode = statusCode;
    this.headers = headers;
  }
}