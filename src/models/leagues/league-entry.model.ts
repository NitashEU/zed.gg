import { Converter, json } from './../../helpers';
import { Queue, Tier } from './../../enums';

import { MiniSeries } from './';

export class LeagueEntry {
  @json('rank', Converter.RankConverter)
  public division: number;
  public hotStreak: boolean;
  @json(MiniSeries)
  public miniSeries: MiniSeries;
  public wins: number;
  public veteran: boolean;
  public losses: number;
  public playerOrTeamId: string;
  public playerOrTeamName: string;
  public inactive: boolean;
  public freshBlood: boolean;
  public leaguePoints: number;

  constructor() {
    this.division = void 0;
    this.hotStreak = void 0;
    this.miniSeries = void 0;
    this.wins = void 0;
    this.veteran = void 0;
    this.losses = void 0;
    this.playerOrTeamId = void 0;
    this.playerOrTeamName = void 0;
    this.inactive = void 0;
    this.freshBlood = void 0;
    this.leaguePoints = void 0;
  }
}