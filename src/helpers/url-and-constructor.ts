export class UrlAndConstructor<T> {
  public url: string;
  public classConstructor: new () => T;

  constructor(url: string, classConstructor: new () => T) {
    this.url = url;
    this.classConstructor = classConstructor;
  }
}
