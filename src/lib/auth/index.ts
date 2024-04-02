import User from "./User";

export default class Auth {
  private user: User = new User(this);

  public signIn() {

    if(this.user.init()) {
      return;
    }

    if(!this.user.init()){
        console.log('debug:', 123);
    }
  }


  public signOut() {
    localStorage.removeItem('User_Data');
  }

  public getUser(): User {
    return this.user;
  }
}
