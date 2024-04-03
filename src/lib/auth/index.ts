import User from "./User";
import usersJsonEnum from "../../users.json";

export default class Auth {
  private user: User = new User(this);

  public signIn(email?: string, password?: string) {
    if (this.user.init()) {
      return;
    }

    if (!this.user.init()) {
      const usersEnum = Object.values(usersJsonEnum);
      const foundUser = usersEnum.find(
        (item) => item.email === email && item.password === password,
      );

      if (foundUser) {
        this.user.id = foundUser.id;
        this.user.type = foundUser.type;
        this.user.email = foundUser.email;
      }

      if (!foundUser) {
        console.debug("User not found!");
      }
    }
  }

  public isLogin() {
    console.log("debug:", this.user.id);
    return this.user.id !== null;
  }

  public signOut(): void {
    localStorage.removeItem("User_Data");
  }

  public getUser(): User {
    return this.user;
  }
}
