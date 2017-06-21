import { LeagueMap, Queue, Region, Season, Tier } from './../enums';
import { isInstance, isPrimitiveOrPrimitiveClass, isType } from './'

import { platformIds } from './../constants';

// TODO: We have to improve the deserializing sometime.
/*export namespace Serializer {
  const enumMap: Map<any, (v) => any> = new Map([
    [<any>Region, (v: string | number) => { // Region comes as platformId from Riot
      return Region[Region[platformIds[v]]];
    }],
    [<any>Tier, (v: string | number) => {
      return typeof v === typeof String
        ? Tier[Tier[v]]
        : Tier[v];
    }],
    [<any>Queue, (v: string | number) => {
      return typeof v === typeof String
        ? Queue[Queue[v]]
        : Queue[v];
    }],
    [<any>Season, (v: string | number) => {
      return typeof v === typeof String
        ? Season[Season[v]]
        : Season[v];
    }],
    [<any>LeagueMap, (v: string | number) => {
      return typeof v === typeof String
        ? LeagueMap[LeagueMap[v]]
        : LeagueMap[v];
    }]
  ]);

  export function deserialize<T>(classConstructor: new () => T, json: string): T {
    return pDeserialize(classConstructor, JSON.parse(json));
  }

  export function deserializeArray<T>(classConstructor: new () => T, json: string): T[] {
    let array: any[] = JSON.parse(json);
    return array.map(a => pDeserialize(classConstructor, a));
  }

  function pDeserialize<T>(classConstructor: new () => T, json: any, isArray?: boolean): T {
    let instance = new classConstructor();
    let types = (instance as any).getTypes
      ? (instance as any).getTypes()
      : {};
    let enumTypes = (instance as any).getEnums
      ? (instance as any).getEnums()
      : {};

    for (let prop in json) {
      if (!json.hasOwnProperty(prop)) {
        continue;
      }

      let type = isArray
        ? classConstructor
        : types[prop];
      let enumType = undefined;
      try {
        enumType = enumTypes[prop];
      } catch (ex) { }

      if (Array.isArray(json[prop])) {
        instance[prop] = (json[prop] as Array<any>).map(v => {
          if (typeof v === 'object' && type !== undefined) {
            return pDeserialize(type, v, true);
          } else if (enumType !== undefined) {
            instance[prop] = enumMap.get(enumType)(json[prop]);
          } else {
            return v;
          }
        })
      }
      else if (enumType !== undefined) {
        instance[prop] = enumMap.get(enumType)(json[prop]);
      } else if (typeof json[prop] === 'object' && type !== undefined) {
        instance[prop] = pDeserialize(type, json[prop]);
      } else {
        instance[prop] = json[prop];
      }
    }

    return instance;
  }
}*/

export function json<T>(): (target: Object, targetKey: string | symbol) => void
export function json<T>(name: string): (target: Object, targetKey: string | symbol) => void
export function json<T>(converter: CustomConverter<T>): (target: Object, targetKey: string | symbol) => void
export function json<T>(classConstructor: { new (): T }): (target: Object, targetKey: string | symbol) => void
export function json<T>(name: string, classConstructor: new () => T)
export function json<T>(name: string, converter: CustomConverter<T>)
export function json<T>(classConstructor: new () => T, converter: CustomConverter<T>)
export function json<T>(name: string, classConstructor: new () => T, converter: CustomConverter<T>)
export function json<T>(firstParam?: string | CustomConverter<T> | { new (): T }, secondParam?: string | CustomConverter<T> | { new (): T }, thirdParam?: string | CustomConverter<T> | { new (): T }): (target: Object, targetKey: string | symbol) => void {
  let decoratorMetaData = {} as IDecoratorMetaData<T>;

  if (!!firstParam && isType(firstParam, 'string')) decoratorMetaData.name = firstParam as string;
  if (!!firstParam && isInstance(firstParam, Function)) decoratorMetaData.classConstructor = firstParam as new () => T;
  if (!!firstParam && isInstance(firstParam, CustomConverter)) decoratorMetaData.converter = firstParam as CustomConverter<T>;

  if (!!secondParam && isType(secondParam, 'string')) decoratorMetaData.name = secondParam as string;
  if (!!secondParam && isInstance(secondParam, Function)) decoratorMetaData.classConstructor = secondParam as new () => T;
  if (!!secondParam && isInstance(secondParam, CustomConverter)) decoratorMetaData.converter = secondParam as CustomConverter<T>;

  if (!!thirdParam && isType(thirdParam, 'string')) decoratorMetaData.name = thirdParam as string;
  if (!!thirdParam && isInstance(thirdParam, Function)) decoratorMetaData.classConstructor = thirdParam as new () => T;
  if (!!thirdParam && isInstance(thirdParam, CustomConverter)) decoratorMetaData.converter = thirdParam as CustomConverter<T>;

  return Reflect.metadata('json', decoratorMetaData);
}

interface IDecoratorMetaData<T> {
  name?: string,
  classConstructor?: new () => T,
  converter?: CustomConverter<T>
}

export class CustomConverter<T> {
  protected fromJSON(v: any, pv?: any): T {
    return JSON.parse(v);
  }
}
export interface IGenericObject {
  [key: string]: any;
}
function mapFromJson<T>(decoratorMetadata: IDecoratorMetaData<any>, instance: T, json: IGenericObject, key: any): any {
  let decoratorName = decoratorMetadata.name || key;
  let innerJson: any = json ? json[decoratorName] : undefined;
  if (Array.isArray(json)) {
    if (decoratorMetadata && decoratorMetadata.classConstructor) {
      return deserializeArray(decoratorMetadata.classConstructor, json);
    } else {
      return json;
    }
  }

  if (!isPrimitiveOrPrimitiveClass(decoratorMetadata.classConstructor)) {
    return deserialize(decoratorMetadata.classConstructor, json);
  }

  return json ? json[decoratorName] : undefined;
}
function hasAnyNullOrUndefined(...args: any[]) {
  return args.some((arg: any) => arg === null || arg === undefined);
}

export function deserializeArray<T extends IGenericObject>(classConstructor: new () => T, json: IGenericObject[]): T[] {
  return json.map(j => deserialize(classConstructor, j));
}

export function deserialize<T extends IGenericObject>(classConstructor: new () => T, json: IGenericObject): T {
  if (hasAnyNullOrUndefined(classConstructor, json)) {
    return void 0;
  }

  if (isPrimitiveOrPrimitiveClass(classConstructor)) {
    return json as T;
  }

  if (!isType(json, 'object')) {
    return void 0;
  }
  let instance = new classConstructor();

  Object.keys(instance).forEach((key: string) => {
    let decoratorMetaData = Reflect.getMetadata('json', instance, key);

    if (decoratorMetaData && decoratorMetaData.converter) {
      instance[key] = decoratorMetaData.converter.fromJSON(json[decoratorMetaData.name || key], json);
    } else {
      instance[key] = decoratorMetaData ? mapFromJson(decoratorMetaData, instance, json[decoratorMetaData.name || key], key) : json[key];
    }
  });

  return instance;
}