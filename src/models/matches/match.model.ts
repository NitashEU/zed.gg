import { Converter, deserialize, json } from './../../helpers';
import { LeagueMap, Queue, Region, Season } from './../../enums';
import { MatchSummoner, MatchTeam } from './';

export class Match {
  public gameId: number;
  @json('seasonId', Converter.SeasonConverter)
  public season: Season;
  @json('queueId', Converter.QueueConverter)
  public queue: Queue;
  @json('platformId', Converter.RegionConverter)
  public region: Region;
  public gameVersion: string;
  public gameMode: string;
  public gameType: string;
  @json('mapId', Converter.LeagueMapConverter)
  public map: LeagueMap;
  public gameDuration: number;
  @json('gameCreation', Converter.TimestampDateConverter)
  public playedOn: Date;
  @json('teams', Converter.TeamsConverter)
  /*@json('participantIdentities', Converter.ParticipantIdentitiesConverter)*/
  public matchTeams: MatchTeam[];

  constructor() {
    this.gameId = void 0;
    this.season = void 0;
    this.queue = void 0;
    this.region = void 0;
    this.gameVersion = void 0;
    this.gameMode = void 0;
    this.gameType = void 0;
    this.map = void 0;
    this.gameDuration = void 0;
    this.playedOn = void 0;
    this.matchTeams = void 0;
  }

  private get teams(): any[] {
    return void 0;
  }

  private set participants(v: any[]) {
    if (!v) return;
  }

  private set participantIdentities(v: any[]) {
    if (!v) return;
    this.matchTeams.forEach(mt => {
      mt.participants.forEach(p => {
        p.summoner = deserialize(MatchSummoner, (v.find(pi => pi.participantId === p.participantId).player));
      });
    });
  }
}