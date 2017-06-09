export class RateLimit {
  private seconds: number;
  private maximumCalls: number;

  constructor(seconds: number, maximumCalls: number) {
    this.seconds = seconds;
    this.maximumCalls = maximumCalls;
  }
}
