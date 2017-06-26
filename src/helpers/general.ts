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