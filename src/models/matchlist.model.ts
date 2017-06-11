import { Deserializable } from '.';

export class Matchlist extends Deserializable {
  public totalGames: number;
  public beginIndex: number;
  public endIndex: number;
  public matches: MatchReference[];

  protected pGetTypes(): Object {
    return {
      matches: MatchReference
    };
  }
}

export class MatchReference {
  public gameId: number;
  public platformId: string;
  public season: number;
  public queue: number;
  public champion: number;
  public role: string;
  public lane: string;
  public playedOn: Date;

  private set timestamp(v: number) {
    this.playedOn = new Date(v);
  }
}
