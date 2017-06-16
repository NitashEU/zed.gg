import { Converter, json } from './../../helpers';

import { Region } from './../../enums';
import { platformIds } from './../../constants';

export class MatchSummoner {
  public summonerName: string;
  public summonerId: number;
  public accountId: number;
  public profileIcon: number;
  public currentAccountId: number;
  @json('platformId', Converter.RegionConverter)
  public region: Region;
  @json('currentPlatformId', Converter.RegionConverter)
  public currentRegion: Region;
  public matchHistoryUri: string;

  constructor() {
    this.summonerName = void 0;
    this.summonerId = void 0;
    this.accountId = void 0;
    this.profileIcon = void 0;
    this.currentAccountId = void 0;
    this.region = void 0;
    this.currentRegion = void 0;
    this.matchHistoryUri = void 0;
  }
}