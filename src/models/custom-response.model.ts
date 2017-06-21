import { Headers } from './';
import { HttpStatusCode } from './../enums';

export class CustomResponse {
  public body: string;
  public date: Date;
  public statusCode: HttpStatusCode;
  public headers: Headers;

  constructor(body: string, date: Date, statusCode: HttpStatusCode, headers: Headers) {
    this.body = body;
    this.date = date;
    this.statusCode = statusCode;
    this.headers = headers;
  }
}