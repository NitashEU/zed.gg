export abstract class Deserializable {
  protected pGetTypes(): Object {
    return {};
  }

  public getTypes(): Object {
    return this.pGetTypes();
  }
}
