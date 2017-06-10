import { HttpStatusCode } from './../enums/http-status-code.enum';

export class CustomResponse {
  public body: string;
  public date: Date;
  public statusCode: HttpStatusCode;
  public headers: { key: string, value: string }[];

  constructor(body: string, date: Date, statusCode: HttpStatusCode, headers: { key: string, value: string }[]) {
    this.body = body;
    this.date = date;
    this.statusCode = statusCode;
    this.headers = headers;
  }
}