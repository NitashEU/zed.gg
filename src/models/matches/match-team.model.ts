import { Converter, json } from './../../helpers';
import { MatchBan, Participant } from './';

export class MatchTeam {
  public teamId: number;
  @json('win', Converter.StringWinWonConverter)
  public won: boolean;
  public bans: MatchBan[];
  public firstDragon: boolean;
  public firstInhibitor: boolean;
  public firstRiftHerald: boolean;
  public firstBaron: boolean;
  public firstBlood: boolean;
  public firstTower: boolean;
  public baronKills: number;
  public riftHeraldKills: number;
  public vilemawKills: number;
  public inhibitorKills: number;
  public towerKills: number;
  public dragonKills: number;
  public dominionVictoryScore: number;
  public participants: Participant[];

  constructor() {
    this.teamId = void 0;
    this.won = void 0;
    this.bans = void 0;
    this.firstDragon = void 0;
    this.firstInhibitor = void 0;
    this.firstRiftHerald = void 0;
    this.firstBaron = void 0;
    this.firstBlood = void 0;
    this.firstTower = void 0;
    this.baronKills = void 0;
    this.riftHeraldKills = void 0;
    this.vilemawKills = void 0;
    this.inhibitorKills = void 0;
    this.towerKills = void 0;
    this.dragonKills = void 0;
    this.dominionVictoryScore = void 0;
    this.participants = void 0;
  }
}