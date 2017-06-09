import * as request from 'request';

import { RateLimit } from './rate-limit/rate-limit';
import { Region } from './enums/region.enum';

export class ZedGg {
  private region: Region;
  private apiKey: string;
  private rateLimits: RateLimit[];

  constructor(region: Region, apiKey: string)
  constructor(region: Region, apiKey: string, rateLimits: RateLimit[])
  constructor(region: Region, apiKey: string, rateLimits?: RateLimit[]) {
    this.region = region;
    this.apiKey = apiKey;
    this.rateLimits = !rateLimits
      ? [new RateLimit(10, 10), new RateLimit(600, 500)]
      : rateLimits;
  }

  private baseRequest(): void {

  }
} 