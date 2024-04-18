import User from "./User";
import Api from "../api/Api";

export default class Auth {
  private user: User = new User(this);
  public async logIn(email: string, password: string): Promise<any> {
    await new Api()
      .auth({ email, password })
      .then((responce) => {
        const {
          data: { email, id, role, token },
        } = responce;
        this.user.email = email;
        this.user.id = id;
        this.user.role = role;
        this.user.token = token;
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
    return this.user.role === "editor";
  }

  public signOut(): void {
    localStorage.removeItem("User_Data");
  }

  public getUser(): User {
    return this.user;
  }
}
