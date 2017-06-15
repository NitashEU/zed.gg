import { LeagueList, Match, Matchlist, Summoner } from './models';

import { UrlAndConstructor } from './helpers';

export namespace Endpoints { // TODO: Need to rework UrlAndConstructor creation
  export const baseUrl = 'https://{platformId}.api.riotgames.com'

  export namespace Leagues {
    const baseUrl = 'lol/league/v3/leagues/';
    const baseConstructor = LeagueList;

    export const bySummonerId = new UrlAndConstructor(baseUrl + 'by-summoner/{summonerId}', baseConstructor, true);
  }

  export namespace Summoners {
    const baseUrl = 'lol/summoner/v3/summoners/';
    const baseConstructor = Summoner;

    export const byAccountId = new UrlAndConstructor(baseUrl + 'by-account/{accountId}', baseConstructor);
    export const bySummonerName = new UrlAndConstructor(baseUrl + 'by-name/{summonerName}', baseConstructor);
    export const bySummonerId = new UrlAndConstructor(baseUrl + '{summonerId}', baseConstructor);
  }

  export namespace Matches {
    const baseUrl = 'lol/match/v3/matches/';
    const baseConstructor = Match;

    export const byMatchId = new UrlAndConstructor(baseUrl + '{matchId}', baseConstructor);
  }

  export namespace Matchlists {
    const baseUrl = 'lol/match/v3/matchlists/';
    const baseConstructor = Matchlist;

    export const byAccountId = new UrlAndConstructor(baseUrl + 'by-account/{accountId}', baseConstructor);
    export const byAccountIdRecent = new UrlAndConstructor(baseUrl + 'by-account/{accountId}/recent', baseConstructor);
  }
}