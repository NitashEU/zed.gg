import { Summoner } from './models/summoner.model';
import { UrlAndConstructor } from './helpers/url-and-constructor';

export namespace Endpoints {
  export const baseUrl = 'https://{platformId}.api.riotgames.com/'

  export namespace Summoners {
    const baseUrl = 'lol/summoner/v3/summoners/';
    const baseConstructor = Summoner;

    export const byAccountId = new UrlAndConstructor(baseUrl + 'by-account/{accountId}', baseConstructor);
    export const bySummonerName = new UrlAndConstructor(baseUrl + 'by-name/{summonerName}', baseConstructor);
    export const bySummonerId = new UrlAndConstructor(baseUrl + '{summonerId}', baseConstructor);
  }
}