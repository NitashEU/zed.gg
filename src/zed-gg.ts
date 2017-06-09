import * as request from 'request';

import { RateLimit } from './rate-limit/rate-limit';

export class ZedGg {
  private apiKey: string;
  private rateLimits: RateLimit[];

  constructor(apiKey: string)
  constructor(apiKey: string, rateLimits: RateLimit[])
  constructor(apiKey: string, rateLimits?: RateLimit[]) {
    this.apiKey = apiKey;
    this.rateLimits = !rateLimits
      ? [new RateLimit(10, 10), new RateLimit(600, 500)]
      : rateLimits;
  }

  private baseRequest(): void {

  }
} 