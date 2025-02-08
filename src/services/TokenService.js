const defaultConfig = {
  path: "/",
  security: true,
  sameSite: "Lax",
  httpOnly: false,
};

const TokenService = (() => {
  let token = null;
 console.log(token);
  const setToken = (newToken) => {
  
    token = newToken;
     
  };

  const getToken = () => {
    return token;
  };

  const removeToken = () => {
    token = null;
    removeRefreshToken();
  };

  const setRefreshToken = (refreshToken, config = defaultConfig) => {
    document.cookie = `refreshtoken=${refreshToken};`; //${generateTokenString( config )}
  };

  const removeRefreshToken = (config = defaultConfig) => {
    document.cookie = `refreshtoken=;expires=Thu, 01 Jan 1970 00:00:00 GMT;${generateTokenString(
      config
    )}`;
  };

  const generateTokenString = (config) => {
    const { path, security, sameSite, httpOnly } = config;

    return `path=${path};security=${security};sameSite=${sameSite};${
      httpOnly ? "HttpOnly" : ""
    }`;
  };

  return {
    setToken,
    getToken,
    removeToken,
    setRefreshToken,
    removeRefreshToken,
  };
})();

export default TokenService;
