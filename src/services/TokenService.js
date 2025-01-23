class TokenService {
  // initialize token as null

  static #token = null;

  //   Configuration for Token store
  static #config = {
    path: "/",
    security: true,
    sameSite: "strict",
    httpOnly: true,
  };

  //     Set token to variable
  static setToken(token) {
    this.#token = token;
  }

  //   getting token from variable
  static getToken() {
    return this.#token;
  }

  //   Remove Access token

  static removeToken() {
    this.token = null;
    this.removeRefreshToken();
  }

  // set Refresh token to header in httpOnly cookie
  static setRefreshToken() {
    document.cookie = `refreshtoken:${
      this.#token
    };${this.generateTokenString()}`;
  }

  //   Remove Refresh Token from HttpOnly or from header
  static removeRefreshToken() {
    document.cookie = `refreshtoken: expires:Thu, 01 Jan 1970 00:00:00 GMT;${this.generateTokenString()}`;
  }

  //   generate token string
  static generateTokenString() {
    const { path, security, sameSite, httpOnly } = this.#config;

    return `path=${path};security=${security};sameSite=${sameSite};httpsOnly=${
      httpOnly ? httpOnly : ""
    }`;
  }
}

export default TokenService;
