import User from "./User";

export default class Editor extends User {
  private isEditor: boolean;

  constructor(name: string, password: string, isEditor: boolean) {
    super(name, password);
    this.isEditor = isEditor;
  }
}
