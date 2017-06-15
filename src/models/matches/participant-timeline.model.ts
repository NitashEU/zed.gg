export class ParticipantTimeline {
  public lane: string;
  public role: string;
  public csDiffPerMinDeltas: Map<string, number>;
  public goldPerMinDeltas: Map<string, number>;
  public xpDiffPerMinDeltas: Map<string, number>;
  public creepsPerMinDeltas: Map<string, number>;
  public xpPerMinDeltas: Map<string, number>;
  public damageTakenDiffPerMinDeltas: Map<string, number>;
  public damageTakenPerMinDeltas: Map<string, number>;

  constructor() {
    this.lane = void 0;
    this.role = void 0;
    this.csDiffPerMinDeltas = void 0;
    this.goldPerMinDeltas = void 0;
    this.xpDiffPerMinDeltas = void 0;
    this.creepsPerMinDeltas = void 0;
    this.xpPerMinDeltas = void 0;
    this.damageTakenDiffPerMinDeltas = void 0;
    this.damageTakenPerMinDeltas = void 0;
  }
}