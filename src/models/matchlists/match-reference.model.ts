import { Converter, json } from '../../helpers';

export class MatchReference {
  public gameId: number;
  public platformId: string;
  public season: number;
  public queue: number;
  public champion: number;
  public role: string;
  public lane: string;
  @json('timestamp', Converter.TimestampDateConverter)
  public playedOn: Date;

  constructor() {
    this.gameId = void 0;
    this.platformId = void 0;
    this.season = void 0;
    this.queue = void 0;
    this.champion = void 0;
    this.role = void 0;
    this.lane = void 0;
    this.playedOn = void 0;
  }
}
