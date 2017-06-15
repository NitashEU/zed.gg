import { Converter, json } from '../../helpers';
import { Queue, Tier } from '../../enums';

import { LeagueEntry } from '.';

export class LeagueList {
  public name: string;
  @json(Converter.TierConverter)
  public tier: Tier;
  @json(Converter.QueueConverter)
  public queue: Queue;
  @json(LeagueEntry)
  public entries: LeagueEntry[];

  constructor() {
    this.name = void 0;
    this.tier = void 0;
    this.queue = void 0;
    this.entries = void 0;
  }
}