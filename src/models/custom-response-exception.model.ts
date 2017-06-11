import { Headers } from '.';
import { HttpStatusCode } from './../enums';

export class CustomResponseException {
  public requestUrl: string;
  public date: Date;
  public statusCode: HttpStatusCode;
  public headers: Headers;

  constructor(requestUrl: string, date: Date, statusCode: HttpStatusCode, headers: Headers) {
    this.requestUrl = requestUrl;
    this.date = date;
    this.statusCode = statusCode;
    this.headers = headers;
  }
}