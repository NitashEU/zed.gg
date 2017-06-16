import { Converter, json } from './../../helpers';

export class Summoner {
  public id: number;
  public accountId: number;
  public name: string;
  public summonerLevel: number;
  public profileIconId: number;
  @json(Converter.TimestampDateConverter)
  public revisionDate: Date;

  constructor() {
    this.id = void 0;
    this.accountId = void 0;
    this.name = void 0;
    this.summonerLevel = void 0;
    this.profileIconId = void 0;
    this.revisionDate = void 0;
  }
}