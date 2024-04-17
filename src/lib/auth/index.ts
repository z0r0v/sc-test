import User from "./User";
// import usersJsonEnum from "../../users.json";
import Api from "../api/Api";

export default class Auth {
  private user: User = new User(this);

  public async logIn(email: string, password: string) {
    await new Api()
      .auth({ email, password })
      .then((responce) => {
        this.user.token = responce.data;
      })
      .catch((error) => {
        console.debug("error:", error);
      });
  }

  public signIn() {
    if (this.user.init()) {
      return;
    }

    if (!this.user.init()) {
      // const usersEnum = Object.values(usersJsonEnum);
      // const foundUser = usersEnum.find(
      //   (item) => item.email === email && item.password === password,
      // );
      // if (foundUser) {
      //   this.user.id = foundUser.id;
      //   this.user.type = foundUser.type;
      //   this.user.email = foundUser.email;
      // }
      // if (!foundUser) {
      //   console.debug("User not found!");
      // }
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
