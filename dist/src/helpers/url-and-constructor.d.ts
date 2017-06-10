export declare class UrlAndConstructor<T> {
    url: string;
    classConstructor: new () => T;
    constructor(url: string, classConstructor: new () => T);
}
