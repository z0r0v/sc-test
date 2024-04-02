import Auth from "./auth";

export type AppContext = {
  auth: Auth | null
};
const appContext: AppContext = {auth: null};
export default appContext;
