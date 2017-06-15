import { Queue, Season } from './../enums';

import { RequestOptions } from '.';

export class MatchlistByAccountIdOptions implements RequestOptions {
  public season: Season;
  public queue: Queue;
  public champion: number;
  public beginTime: Date;
  public endTime: Date;
  public beginIndex: number;
  public endIndex: number;

  public getRiotOptions(): Object {
    let object = {};

    if (!!this.season)
      object['season'] = this.season;
    if (!!this.queue)
      object['queue'] = this.queue;
    if (!!this.champion)
      object['champion'] = this.champion;
    if (!!this.beginTime)
      object['beginTime'] = this.beginTime.getTime();
    if (!!this.endTime)
      object['endTime'] = new Date(this.endTime.setTime(this.endTime.getTime() + 1 * 86400000)).getTime() - 1;
    if (!!this.beginIndex)
      object['beginIndex'] = this.beginIndex;
    if (!!this.endIndex)
      object['endIndex'] = this.endIndex;

    return object;
  }
}
