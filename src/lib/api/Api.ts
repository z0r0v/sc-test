import env from "react-dotenv";
import axios from "axios";
import appContext from "../AppContext";

enum Paths {
  Auth = "/auth",
  Users = "/users",
  Messages = "/messages",
  AuditLog = "/audit_log ",
  Players = "/players ",
}

export default class Api {
  private request = (
    path: string,
    params: any = null,
    headers?: any,
  ): Promise<any> => {
    try {
      const response = axios.get(path, {
        params: params,
        headers: headers,
      });
      return response;
    } catch (error) {
      console.debug("Api request error", error);
      throw error;
    }
  };

  private getAutorisationHeader = (): { Authorization: string } => {
    if (appContext.auth === null) {
      throw new Error("zalupa");
    }

    return {
      Authorization: "Bearer " + appContext.auth.getUser().token,
    };
  };

  public auth(params: { email: string; password: string }): Promise<any> {
    return this.request(env.APP_URL + Paths.Auth, params);
  }

  public getUsers(): Promise<any> {
    return this.request(
      env.APP_URL + Paths.Users,
      null,
      this.getAutorisationHeader(),
    );
  }

  public getMessages(params: any): Promise<any> {
    return this.request(
      env.APP_URL + Paths.Messages,
      params,
      this.getAutorisationHeader(),
    );
  }

  public getAuditLog(): Promise<any> {
    return this.request(
      env.APP_URL + Paths.AuditLog,
      null,
      this.getAutorisationHeader(),
    );
  }

  public getPlayers(): Promise<any> {
    return this.request(
      env.APP_URL + Paths.Players,
      null,
      this.getAutorisationHeader(),
    );
  }

  public sendMessages(params: { type: string; item_id: number }): Promise<any> {
    try {
      const response = axios.post(env.APP_URL + Paths.Messages, {
        params: params,
        headers: this.getAutorisationHeader(),
      });
      return response;
    } catch (error) {
      console.debug("Api sendMessages request error", error);
      throw error;
    }
  }

  public aproveMessages(params: { status: string }): Promise<any> {
    try {
      const response = axios.put(env.APP_URL + Paths.Messages, {
        params: params,
        headers: this.getAutorisationHeader(),
      });
      return response;
    } catch (error) {
      console.debug("Api aproveMessages request error", error);
      throw error;
    }
  }
}
