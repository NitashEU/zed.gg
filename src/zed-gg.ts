import 'reflect-metadata'

import * as request from 'request';

import { CustomResponseException, Headers, LeagueList, Match, Matchlist, Summoner } from './models';
import { HttpHelper, Requester, UrlAndConstructor, deserialize, deserializeArray } from './helpers';
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

  private async requestSingle<T>(urlAndConstructor: UrlAndConstructor<T>, options?: any, requestOptions?: RequestOptions): Promise<T> {
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
      return deserialize(urlAndConstructor.classConstructor, JSON.parse(result.body));
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

  private async requestMultiple<T>(urlAndConstructor: UrlAndConstructor<T>, options?: any, requestOptions?: RequestOptions): Promise<T[]> {
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
      return deserializeArray(urlAndConstructor.classConstructor, JSON.parse(result.body));
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
    let result = await this.requestSingle(Endpoints.Summoners.byAccountId, {
      accountId
    });
    return result;
  }

  private getSummonerBySummonerName = async (summonerName: string): Promise<Summoner> => {
    let result = await this.requestSingle(Endpoints.Summoners.bySummonerName, {
      summonerName
    });
    return result;
  }

  private getSummonerBySummonerId = async (summonerId: number): Promise<Summoner> => {
    let result = await this.requestSingle(Endpoints.Summoners.bySummonerId, {
      summonerId
    });
    return result;
  }

  private getLeaguesBySummonerId = async (summonerId: number): Promise<LeagueList[]> => {
    let result = await this.requestMultiple(Endpoints.Leagues.bySummonerId, {
      summonerId
    });
    return result;
  }

  private getMasterLeaguesByQueue = async (queue: Queue): Promise<LeagueList> => {
    let result = await this.requestSingle(Endpoints.MasterLeagues.byQueue, {
      queue: Queue[queue]
    });
    return result;
  }

  private getChallengerLeaguesByQueue = async (queue: Queue): Promise<LeagueList> => {
    let result = await this.requestSingle(Endpoints.ChallengerLeagues.byQueue, {
      queue: Queue[queue]
    });
    return result;
  }

  private getMatchByMatchId = async (matchId: number): Promise<Match> => {
    let result = await this.requestSingle(Endpoints.Matches.byMatchId, {
      matchId
    });
    return result;
  }

  private getMatchlistByAccountId = async (accountId: number, requestOptions?: MatchlistByAccountIdOptions): Promise<Matchlist> => {
    let result = await this.requestSingle(Endpoints.Matchlists.byAccountId, {
      accountId
    }, requestOptions);
    return result;
  }

  private getMatchlistByAccountIdRecent = async (accountId: number): Promise<Matchlist> => {
    let result = await this.requestSingle(Endpoints.Matchlists.byAccountIdRecent, {
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

  public leagues = {
    by: {
      summonerId: this.getLeaguesBySummonerId
    }

  }

  public masterLeagues = {
    by: {
      queue: this.getMasterLeaguesByQueue
    }
  };

  public challengerLeagues = {
    by: {
      queue: this.getChallengerLeaguesByQueue
    }
  };

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
