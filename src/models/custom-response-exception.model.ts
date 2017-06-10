import { HttpStatusCode } from './../enums/http-status-code.enum';

export class CustomResponseException {
  public requestUrl: string;
  public date: Date;
  public statusCode: HttpStatusCode;
  public headers: { key: string, value: string }[];

  constructor(requestUrl: string, date: Date, statusCode: HttpStatusCode, headers: { key: string, value: string }[]) {
    this.requestUrl = requestUrl;
    this.date = date;
    this.statusCode = statusCode;
    this.headers = headers;
  }
}