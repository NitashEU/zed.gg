import { CustomConverter, deserialize } from './serializer';
import { LeagueMap, Queue, Region, Season, Tier } from './../enums';
import { MatchSummoner, MatchTeam, Participant } from './../models';

import { isType } from './';
import { platformIds } from './../constants';

export namespace Converter {
  export class RegionCustomConverter extends CustomConverter<Region> {
    protected fromJSON(v: string): Region {
      let platformId = platformIds[v] as string;
      return Region[platformId];
    }
  }
  export class TierCustomConverter extends CustomConverter<Tier> {
    protected fromJSON(v: string | number): Tier {
      return isType(v, 'string')
        ? Tier[v]
        : Tier[Tier[v]];
    }
  }
  export class QueueCustomConverter extends CustomConverter<Queue> {
    protected fromJSON(v: string | number): Queue {
      return isType(v, 'string')
        ? Queue[v]
        : Queue[Queue[v]];
    }
  }
  export class SeasonCustomConverter extends CustomConverter<Season> {
    protected fromJSON(v: string | number): Season {
      return isType(v, 'string')
        ? Season[v]
        : Season[Season[v]];
    }
  }
  export class LeagueMapCustomConverter extends CustomConverter<LeagueMap> {
    protected fromJSON(v: string | number): LeagueMap {
      return isType(v, 'string')
        ? LeagueMap[v]
        : LeagueMap[LeagueMap[v]];
    }
  }
  export class RankCustomConverter extends CustomConverter<number> {
    protected fromJSON(v: string): number {
      switch (v) {
        case 'I':
          return 1;
        case 'II':
          return 2;
        case 'III':
          return 3;
        case 'IV':
          return 4;
        case 'V':
          return 5;
      }
    }
  }
  export class TimestampCustomDateConverter extends CustomConverter<Date> {
    protected fromJSON(v: number) {
      return new Date(v);
    }
  }
  export class StringWinWonCustomConverter extends CustomConverter<boolean> {
    protected fromJSON(v: string) {
      return v === "Win";
    }
  }
  export class TeamsCustomConverter extends CustomConverter<MatchTeam[]> {
    protected fromJSON(v: any[], pv: any): MatchTeam[] {
      let winningTeamDto = v.find(t => t.win === "Win");
      let losingTeamDto = v.find(t => t.win === "Fail");
      let winningTeam = deserialize(MatchTeam, winningTeamDto);
      let losingTeam = deserialize(MatchTeam, losingTeamDto);
      let matchTeams = [winningTeam, losingTeam];
      matchTeams.forEach(mt => {
        mt.participants = pv.participants.filter(p => p.teamId === mt.teamId).map(p => deserialize(Participant, (p)));
        mt.participants.forEach(p => {
          p.summoner = deserialize(MatchSummoner, (pv.participantIdentities.find(pi => pi.participantId === p.participantId).player));
        });
      })
      return matchTeams;
    }
  }

  export const RegionConverter = new RegionCustomConverter();
  export const TierConverter = new TierCustomConverter();
  export const QueueConverter = new QueueCustomConverter();
  export const SeasonConverter = new SeasonCustomConverter();
  export const LeagueMapConverter = new LeagueMapCustomConverter();
  export const RankConverter = new RankCustomConverter();
  export const TimestampDateConverter = new TimestampCustomDateConverter();
  export const StringWinWonConverter = new StringWinWonCustomConverter();
  export const TeamsConverter = new TeamsCustomConverter();
}