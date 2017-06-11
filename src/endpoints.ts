import { Matchlist, Summoner } from './models';

import { UrlAndConstructor } from './helpers';

export namespace Endpoints { // TODO: Need to rework UrlAndConstructor creation
  export const baseUrl = 'https://{platformId}.api.riotgames.com/'

  export namespace Summoners {
    const baseUrl = 'lol/summoner/v3/summoners/';
    const baseConstructor = Summoner;

    export const byAccountId = new UrlAndConstructor(baseUrl + 'by-account/{accountId}', baseConstructor);
    export const bySummonerName = new UrlAndConstructor(baseUrl + 'by-name/{summonerName}', baseConstructor);
    export const bySummonerId = new UrlAndConstructor(baseUrl + '{summonerId}', baseConstructor);
  }

  export namespace Matches {
    const baseUrl = 'lol/match/v3/matches/';
  }

  export namespace Matchlists {
    const baseUrl = 'lol/match/v3/matchlists/';
    const baseConstructor = Matchlist;

    export const byAccountId = new UrlAndConstructor(baseUrl + 'by-account/{accountId}', baseConstructor);
    export const byAccountIdRecent = new UrlAndConstructor(baseUrl + 'by-account/{accountId}/recent', baseConstructor);
  }
}