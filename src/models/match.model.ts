import { Map, Queue, Region, Season } from './../enums';

import { platformIds } from './../constants/platform-ids.constant';

export class Match {
  public gameId: number;
  public season: Season;
  public queue: Queue;
  public region: Region;
  public gameVersion: string;
  public gameMode: string;
  public gameType: string;
  public map: Map;
  public gameDuration: number;
  public playedOn: Date;

  private set seasonId(v: number) {
    this.season = Season[Season[v]];
  }
  private set queueId(v: number) {
    this.queue = Queue[Queue[v]];
  }
  private set platformId(v: string) {
    this.region = Region[Region[platformIds[v]]];
  }
  private set mapId(v: number) {
    this.map = Map[Map[v]];
  }
  private set gameCreation(v: number) {
    this.playedOn = new Date(v);
  }
}