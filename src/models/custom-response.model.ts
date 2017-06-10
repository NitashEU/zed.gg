import { HttpStatusCode } from './../enums/http-status-code.enum';

export class CustomResponse {
  public body: string;
  public statusCode: HttpStatusCode;
  public headers: { key: string, value: string }[];

  constructor(body: string, statusCode: HttpStatusCode, headers: { key: string, value: string }[]) {
    this.body = body;
    this.statusCode = statusCode;
    this.headers = headers;
  }
}