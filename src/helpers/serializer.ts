export namespace Serializer {
  export function deserialize<T>(classConstructor: new () => T, json: string): T {
    return Object.assign(new classConstructor(), JSON.parse(json));
  }
}