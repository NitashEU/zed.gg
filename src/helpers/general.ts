import * as async from 'async';

export function isType(v: any, type: object | string): boolean {
  return typeof v === type;
}

export function isInstance(v: any, f: Function): boolean {
  return v instanceof f;
}

export function isPrimitiveOrPrimitiveClass(obj: any): boolean {
  return !!(['string', 'boolean', 'number'].indexOf((typeof obj)) > -1 || (obj instanceof String || obj === String ||
    obj instanceof Number || obj === Number ||
    obj instanceof Boolean || obj === Boolean));
}

export function asyncForEach<T>(arr: T[], fn: (v: T) => Promise<void>): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    async.forEach(arr, async (v, c) => {
      try {
        await fn(v);
      }
      catch (ex) {
        throw ex;
      }
      finally {
        c();
      }
    }, (err) => {
      if (err) reject(err);
      else resolve();
    });
  })
}