import axios from "axios";

class BaseApiService {
  constructor(authAction) {
    this.authAction = authAction;
    this.api = axios.create({
      baseURL: process.env.API_URL,
      timeout: 10000,
      withCredentials: true,
    });

    // setup our request and response handling
    this.setupRequestInterceptor();
    this.setupResponseInterceptor();
  }

  setupRequestInterceptor() {
    this.api.interceptors.request.use(async (config) => {
      try {
        const token = await this.authAction.getAccessToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      } catch (error) {
        console.error("Error in Request Interceptor:", error);
        throw error;
      }
    });
  }

  setupResponseInterceptor() {
    this.api.interceptors.response.use(
      // Success case => just return the reponse
      (response) => response,

      async (error) => {
        try {
          const originalRequest = error.config;

          // checking if we have 401 error and haven't tried refreshing yet
          if (error.response?.stats === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            //   get the new token and update request
            const token = await this.authAction.getAccessToken();
            originalRequest.headers.Authorization = `Bearer ${token}`;

            //   retry the api with new token
            const response = await this.api(originalRequest);

            return response;
          }
          throw error;
        } catch (error) {
          console.log("Error during refresh the token:", error);
          this.authAction.logout();
          throw error;
        }
      }
    );
  }
  async get(url, config = {}) {
    try {
      const response = await this.api.get(url, config);
      return response;
    } catch (error) {
      console.error(`GET request failed for ${url}:`, error);
      throw error;
    }
  }

  async post(url, data = {}, config = {}) {
    try {
      const response = await this.api.post(url, data, config);
      return response;
    } catch (error) {
      console.error(`POST request failed for ${url}:`, error);
      throw error;
    }
  }
}
