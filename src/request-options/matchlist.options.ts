import { Queue, Season } from './../enums';

import { RequestOptions } from './';

export class MatchlistByAccountIdOptions implements RequestOptions {
  public seasons: Season[];
  public queues: Queue[];
  public champions: number[];
  public beginTime: Date;
  public endTime: Date;
  public beginIndex: number;
  public endIndex: number;

  public getRiotOptions(): Object {
    let object = {};

    if (!!this.seasons)
      object['seasons'] = this.seasons;
    if (!!this.queues)
      object['queues'] = this.queues;
    if (!!this.champions)
      object['champions'] = this.champions;
    if (!!this.beginTime) {
      let beginTime = new Date(this.beginTime.toDateString()).getTime();
      object['beginTime'] = beginTime;
    }
    if (!!this.endTime) {
      let endTime = new Date(this.endTime.toDateString());
      object['endTime'] = new Date(endTime.setTime(endTime.getTime() + 1 * 86400000)).getTime() - 1;
    }
    if (!!this.beginIndex)
      object['beginIndex'] = this.beginIndex;
    if (!!this.endIndex)
      object['endIndex'] = this.endIndex;

    return object;
  }
}
