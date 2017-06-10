import * as request from 'request';

import { CustomResponseException } from './models/custom-response-exception.model';
import { Endpoints } from './endpoints';
import { HttpHelper } from './helpers/http-helper';
import { HttpStatusCode } from './enums/http-status-code.enum';
import { RateLimit } from './rate-limit/rate-limit';
import { RateLimiter } from './rate-limit/rate-limiter';
import { Region } from './enums/region.enum';
import { Requester } from './helpers/requester';
import { Serializer } from './helpers/serializer';
import { Summoner } from './models/summoner.model';
import { UrlAndConstructor } from './helpers/url-and-constructor';
import { platformIds } from './constants/platform-ids.constant';

export class ZedGG {
  private requester: Requester;
  private rateLimiter: RateLimiter;
  private region: Region;
  private apiKey: string;

  constructor(region: Region, apiKey: string)
  constructor(region: Region, apiKey: string, rateLimits: RateLimit[])
  constructor(region: Region, apiKey: string, rateLimits?: RateLimit[]) {
    this.region = region;
    this.apiKey = apiKey;

    this.rateLimiter = new RateLimiter(rateLimits);

    this.defineDefaultRequestOptions();
  }

  private defineDefaultRequestOptions() {
    let platformId = platformIds[Region[this.region]];
    let options: request.CoreOptions = {
      baseUrl: HttpHelper.buildUrlWithOptions(Endpoints.baseUrl, {
        platformId: platformId
      }),
      headers: { 'X-Riot-Token': this.apiKey }
    };
    this.requester = new Requester(options);
  }

  private async getSummonerBySummonerName(summonerName: string): Promise<Summoner> {
    let result = await this.request(Endpoints.Summoners.bySummonerName, {
      summonerName
    });
    return result;
  }

  private async request<T>(urlAndConstructor: UrlAndConstructor<T>): Promise<T>
  private async request<T>(urlAndConstructor: UrlAndConstructor<T>, ...params: any[]): Promise<T>
  private async request<T>(urlAndConstructor: UrlAndConstructor<T>, options: any): Promise<T>
  private async request<T>(urlAndConstructor: UrlAndConstructor<T>, options?: any, ...params: any[]): Promise<T> {
    if (!!options) {
      urlAndConstructor.url = HttpHelper.buildUrlWithOptions(urlAndConstructor.url, options);
    }

    try {
      await this.rateLimiter.waitAll();
      let result = await this.requester.get(urlAndConstructor.url);
      this.handleResponse(result.date, result.statusCode, result.headers);
      return Serializer.deserialize(urlAndConstructor.classConstructor, result.body);
    }
    catch (ex) {
      if (ex instanceof CustomResponseException) {
        let rex = ex as CustomResponseException;
        this.handleResponse(rex.date, rex.statusCode, rex.headers);
        throw rex;
      }
      throw ex;
    }
  }

  private handleResponse(date: Date, statusCode: HttpStatusCode, headers: { key: string, value: string }[]): void {
    this.rateLimiter.adjustToHeader(date, headers);
  }

  public summoners = {
    by: {
      name: this.getSummonerBySummonerName.bind(this)
    }
  }
} 