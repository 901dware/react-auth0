import history from "../history";
import auth0 from "auth0-js";
import { AUTH_CONFIG } from "./auth.config";

export default class Auth {
  accessToken;
  idToken;
  expiresAt;

  auth0 = new auth0.WebAuth({
    domain: AUTH_CONFIG.domain,
    clientID: AUTH_CONFIG.clientId,
    redirectUri: AUTH_CONFIG.callbackUrl,
    responseType: "token id_token",
    scope: "openid"
  });

  login = () => {
    this.auth0.authorize();
  };

  handleAuthentication = () => {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
      } else if (err) {
        history.replace("/home");
        console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  };

  getAccessToken = () => {
    return this.accessToken;
  };

  getIdToken = () => {
    return this.idToken;
  };

  setSession = authResult => {
    localStorage.setItem("isLoggedIn", "true");
    let expiresAt = authResult.expiresIn * 60000 + new Date().getTime();
    this.accessToken = authResult.accessToken;
    this.idToken = authResult.idToken;
    this.expiresAt = expiresAt;
    history.replace("/home");
  };

  renewSession = () => {
    this.auth0.checkSession({}, (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
      } else if (err) {
        this.logout();
        console.log(err);
        alert(
          `Could not get a new token (${err.error}: ${err.error_description}).`
        );
      }
    });
  };

  logout = () => {
    this.accessToken = null;
    this.idToken = null;
    this.expiresAt = 0;
    localStorage.removeItem("isLoggedIn");
    this.auth0.logout({
      returnTo: window.location.origin
    });
    history.replace("/home");
  };

  isAuthenticated = () => {
    let expiresAt = this.expiresAt;
    return new Date().getTime() < expiresAt;
  };
}
