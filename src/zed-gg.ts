import * as request from 'request';

import { CustomResponseException, Headers, Match, Matchlist, Summoner } from './models';
import { HttpHelper, Requester, Serializer, UrlAndConstructor } from './helpers';
import { HttpStatusCode, Region } from './enums';
import { MatchlistByAccountIdOptions, RequestOptions } from './request-options';
import { RateLimit, RateLimiter } from './rate-limit';

import { Endpoints } from '.';
import { platformIds } from './constants';

export class ZedGG {
  private requester: Requester;
  private rateLimiter: RateLimiter;
  private region: Region;
  private apiKey: string;

  constructor(region: Region, apiKey: string, ...rateLimits: RateLimit[]) {
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

  private async request<T>(urlAndConstructor: UrlAndConstructor<T>, options?: any, requestOptions?: RequestOptions): Promise<T> {
    if (!!options) {
      urlAndConstructor.url = HttpHelper.buildUrlWithOptions(urlAndConstructor.url, options);
    }

    let qs = !requestOptions
      ? {}
      : requestOptions.getRiotOptions();

    try {
      await this.rateLimiter.waitAll();
      let result = await this.requester.get(urlAndConstructor.url, {
        qs
      });
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

  private handleResponse(date: Date, statusCode: HttpStatusCode, headers: Headers): void {
    this.rateLimiter.adjustToHeader(date, headers);
  }

  /* BEGIN REQUESTS */
  private getSummonerByAccountId = async (accountId: number): Promise<Summoner> => {
    let result = await this.request(Endpoints.Summoners.byAccountId, {
      accountId
    });
    return result;
  }

  private getSummonerBySummonerName = async (summonerName: string): Promise<Summoner> => {
    let result = await this.request(Endpoints.Summoners.bySummonerName, {
      summonerName
    });
    return result;
  }

  private getSummonerBySummonerId = async (summonerId: number): Promise<Summoner> => {
    let result = await this.request(Endpoints.Summoners.bySummonerId, {
      summonerId
    });
    return result;
  }

  private getMatchByMatchId = async (matchId: number): Promise<Match> => {
    let result = await this.request(Endpoints.Matches.byMatchId, {
      matchId
    });
    return result;
  }

  private getMatchlistByAccountId = async (accountId: number, requestOptions?: MatchlistByAccountIdOptions): Promise<Matchlist> => {
    let result = await this.request(Endpoints.Matchlists.byAccountId, {
      accountId
    }, requestOptions);
    return result;
  }

  private getMatchlistByAccountIdRecent = async (accountId: number): Promise<Matchlist> => {
    let result = await this.request(Endpoints.Matchlists.byAccountIdRecent, {
      accountId
    });
    return result;
  }
  /* END REQUESTS */

  /* BEGIN DEFINITIONS */
  public summoners = {
    by: {
      accountId: this.getSummonerByAccountId,
      name: this.getSummonerBySummonerName,
      summonerId: this.getSummonerBySummonerId
    }
  }

  public matches = {
    by: {
      matchId: this.getMatchByMatchId
    }
  }

  public matchlists = {
    by: {
      accountId: this.getMatchlistByAccountId,
      accountIdRecent: this.getMatchlistByAccountIdRecent
    }
  }
  /* END DEFINITIONS */
} 
