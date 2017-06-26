import * as async from 'async';

export function asyncForEach<T>(arr: T[], fn: (v: T) => Promise<void>): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    async.forEach(arr, async (v, c) => {
      try {
        await fn(v);
      } catch (ex) {
        throw ex;
      } finally {
        c();
      }
    }, (err) => {
      if (err) reject(err);
      else resolve();
    });
  })
}