import { Converter, json } from './../../helpers';
import { Mastery, Rune } from './../general';
import { MatchSummoner, ParticipantStats, ParticipantTimeline } from './';

import { Tier } from './../../enums';

export class Participant {
  public participantId: number;
  public championId: number;
  @json(MatchSummoner)
  public summoner: MatchSummoner;
  public spell1Id: number;
  public spell2Id: number;
  @json('highestAchievedSeasonTier', Converter.TierConverter)
  public highestSeasonLeague: Tier;
  @json(ParticipantStats)
  public stats: ParticipantStats;
  @json(ParticipantTimeline)
  public timeline: ParticipantTimeline;
  @json(Rune)
  public runes: Rune[];
  @json(Mastery)
  public masteries: Mastery[];

  constructor() {
    this.participantId = void 0;
    this.championId = void 0;
    this.summoner = void 0;
    this.spell1Id = void 0;
    this.spell2Id = void 0;
    this.highestSeasonLeague = void 0;
    this.stats = void 0;
    this.timeline = void 0;
    this.runes = void 0;
    this.masteries = void 0;
  }
}