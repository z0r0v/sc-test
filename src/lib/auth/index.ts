import User from "./User";
import Api from "../api/Api";
import { Roles } from "../enums/Roles";

export default class Auth {
  private user: User = new User(this);
  private storageItemKey: string = "user_data";

  public async logIn(email: string, password: string): Promise<any> {
    await new Api()
      .auth({ email, password })
      .then((responce) => {
        const {
          data: { email, id, role, token, name },
        } = responce;
        this.user.email = email;
        this.user.id = id;
        this.user.role = role;
        this.user.token = token;
        this.user.name = name;
        return Promise.resolve(this.user);
      })
      .catch((error) => {
        console.debug("error:", error);
        return Promise.reject(error);
      });
  }

  public signIn() {
    if (this.user.init()) {
      return;
    }
  }

  public isLogin() {
    return this.user.token !== null;
  }

  public isEditor() {
    return this.user.role === Roles.Editor;
  }

  public signOut(): void {
    localStorage.removeItem(this.storageItemKey);
  }

  public getUser(): User {
    return this.user;
  }
}
