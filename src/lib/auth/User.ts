import Auth from "./index";

type Data = {
  id: string | null;
  role: string | null;
  email: string | null;
  token: string | null;
};

export default class User {
  private auth: Auth;
  private readonly userKey: string = "User_Data";

  private data: Data = {
    id: null,
    role: null,
    email: null,
    token: null,
  };

  constructor(auth: Auth) {
    this.auth = auth;
  }

  get id(): string | null {
    return this.data.id;
  }

  set id(value) {
    this.data.id = value;
    this.setUserToStorage();
  }
  get token(): string | null {
    return this.data.token;
  }

  set token(value) {
    this.data.token = value;
    this.setUserToStorage();
  }

  get role(): string | null {
    return this.data.role;
  }

  set role(value) {
    this.data.role = value;
    this.setUserToStorage();
  }

  get email(): string | null {
    return this.data.email;
  }

  set email(value) {
    this.data.email = value;
    this.setUserToStorage();
  }

  public async setAllAttributes(user: Data) {
    this.data = user;
    this.setUserToStorage();
  }

  public init() {
    const userJson = this.getUserFromStorage();
    if (userJson !== null) {
      const user = JSON.parse(this.getUserFromStorage());
      this.setAllAttributes(user);
      return true;
    }
    return false;
  }

  private setToStorage(key: string, data: string) {
    localStorage.setItem(key, data);
  }

  private setUserToStorage() {
    return this.setToStorage(this.userKey, JSON.stringify(this.data));
  }

  private getFromStorage(key: string): string {
    return <string>localStorage.getItem(key);
  }

  private getUserFromStorage(): string {
    return this.getFromStorage(this.userKey);
  }
}
