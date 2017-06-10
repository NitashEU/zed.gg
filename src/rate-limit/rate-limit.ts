import * as Deque from 'double-ended-queue/js/deque';

import { Mutex, MutexInterface } from 'async-mutex';

export class RateLimit {
  public seconds: number;
  public maximumCalls: number;

  private mutex = new Mutex();
  private deque = new Deque();

  private buffer: number;

  constructor(seconds: number, maximumCalls: number) {
    this.buffer = seconds * 50;
    this.seconds = seconds;
    this.maximumCalls = maximumCalls;
  }

  public getCurrentQueueLength(): number {
    return this.deque.length;
  }

  public addRequest(date?: Date): void {
    if (!date) {
      date = new Date();
    }
    this.deque.push(date.getTime() + this.seconds * 1000);
  }

  public async wait(): Promise<void> {
    return new Promise<void>(resolve => {
      this._wait(resolve);
    });
  }

  private async _wait(resolve: (value?: void | PromiseLike<void>) => void): Promise<void> {
    let time = new Date().getTime();
    while (this.deque.length > 0 && time - this.deque.peekFront() >= this.buffer) {
      this.deque.shift();
    }

    if (this.deque.length < this.maximumCalls) {
      resolve();
    } else {
      setTimeout(() => {
        this._wait(resolve);
      }, this.buffer / 2);
    }
  }
}
