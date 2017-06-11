import { Mutex, MutexInterface } from 'async-mutex';

import { Headers } from './../models';
import { RateLimit } from '.';
import { rateLimitHeaders } from './../constants';

export class RateLimiter {
  private alreadyAdjustedOnce: boolean;
  private releaserForFirstAdjustment: MutexInterface.Releaser;

  private rateLimits: RateLimit[];
  private mutex = new Mutex();

  private rateLimitHeaders = new Map();

  constructor(rateLimits: RateLimit[]) {
    this.rateLimits = !rateLimits
      ? [new RateLimit(10, 10), new RateLimit(600, 500)]
      : rateLimits;

    let tenSecRateLimit = this.rateLimits.filter(rl => rl.seconds === 10)[0];

    this.rateLimits.push(new RateLimit(0.5, tenSecRateLimit.maximumCalls / 10));

    rateLimitHeaders.forEach(rlh => {
      this.rateLimitHeaders.set(rlh.toLowerCase(), rlh.toLowerCase());
    })
  }

  public async waitAll(): Promise<void> {
    let release = await this.mutex.acquire();
    await Promise.all(this.rateLimits.map(rl => rl.wait()));
    this.rateLimits.forEach(rl => rl.addRequest());
    if (this.alreadyAdjustedOnce) {
      release();
    } else {
      this.releaserForFirstAdjustment = release;
    }
  }

  public adjustToHeader(date: Date, headers: Headers): void { // TODO: This is SO nasty!
    let map = new Map();
    let limits = Object.keys(headers).filter(key => this.rateLimitHeaders.has(key.toLowerCase())).map(key => headers[key]);
    limits.forEach(gLimits => {
      gLimits.split(',').forEach(limit => {
        let splitted = limit.split(':');
        let key = parseInt(splitted[1]);
        let value = splitted[0];
        let list = map.get(key);
        if (!list) {
          map.set(key, [value]);
        } else {
          list.push(value);
        }
      });
    });

    map.forEach((value, key) => {
      let highestValue = value.sort((a, b) => b - a)[0];
      this.rateLimits.forEach(rl => {
        if (rl.seconds === key) {
          let currentQueueLength = rl.getCurrentQueueLength();
          if (highestValue > currentQueueLength) {
            console.log('adding ' + (highestValue - currentQueueLength) + ' more to ' + key);
            for (var i = 0; i < highestValue - currentQueueLength; i++) {
              rl.addRequest(date);
            }
          }
        }
      });
    });

    if (!this.alreadyAdjustedOnce) {
      this.alreadyAdjustedOnce = true;
      this.releaserForFirstAdjustment();
    }
  }
}