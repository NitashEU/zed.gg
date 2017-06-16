import { MatchReference } from '.';
import { json } from './../../helpers';

export class Matchlist {
  public totalGames: number;
  public beginIndex: number;
  public endIndex: number;
  @json(MatchReference)
  public matches: MatchReference[];

  constructor() {
    this.totalGames = void 0;
    this.beginIndex = void 0;
    this.endIndex = void 0;
    this.matches = void 0;
  }
}