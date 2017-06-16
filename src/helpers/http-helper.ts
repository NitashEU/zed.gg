import * as request from 'request';

export namespace HttpHelper {
  export function buildUrlWithOptions(url: string | String, options: any): string {
    Object.keys(options).forEach(key => {
      url = url.replace(`{${key}}`, options[key]);
    });
    return url as string;
  }
}