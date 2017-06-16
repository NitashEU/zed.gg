import { LeagueList, Match, Matchlist, Summoner } from './models';

import { UrlAndConstructor } from './helpers';

export namespace Endpoints { // TODO: Need to rework UrlAndConstructor creation
  export const baseUrl = 'https://{platformId}.api.riotgames.com'

  export namespace Leagues {
    const baseUrl = 'lol/league/v3/leagues/';
    const baseConstructor = LeagueList;

    export const bySummonerId = new UrlAndConstructor(baseUrl + 'by-summoner/{summonerId}', baseConstructor);
  }

  export namespace MasterLeagues {
    const baseUrl = 'lol/league/v3/masterleagues/';
    const baseConstructor = LeagueList;

    export const byQueue = new UrlAndConstructor(baseUrl + 'by-queue/{queue}', baseConstructor);
  }

  export namespace ChallengerLeagues {
    const baseUrl = 'lol/league/v3/challengerleagues/';
    const baseConstructor = LeagueList;

    export const byQueue = new UrlAndConstructor(baseUrl + 'by-queue/{queue}', baseConstructor);
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

  export namespace StaticData {
    const baseUrl = 'lol/static-data/v3/';

    export const versions = new UrlAndConstructor(baseUrl + 'versions', String);
  }
}