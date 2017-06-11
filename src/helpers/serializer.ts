export namespace Serializer {
  export function deserialize<T>(classConstructor: new () => T, json: string): T {
    return pDeserialize(classConstructor, JSON.parse(json));
  }

  function pDeserialize<T>(classConstructor: new () => T, json: any, isArray?: boolean): T {
    let instance = new classConstructor();
    let types = (instance as any).getTypes
      ? (instance as any).getTypes()
      : {};

    for (let prop in json) {
      if (!json.hasOwnProperty(prop)) {
        continue;
      }

      let type = isArray
        ? classConstructor
        : types[prop];

      if (Array.isArray(json[prop])) {
        instance[prop] = (json[prop] as Array<any>).map(v => {
          if (typeof v === 'object') {
            return pDeserialize(type, v, true);
          } else {
            return v;
          }
        })
      }
      else if (typeof json[prop] === 'object') {
        instance[prop] = deserialize(type, json[prop]);
      } else {
        instance[prop] = json[prop];
      }
    }

    return instance;
  }
}