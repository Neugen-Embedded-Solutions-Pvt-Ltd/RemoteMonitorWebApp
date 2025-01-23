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

            //   try to refresh the token
            await this.authAction.refreshToken();

            //   get the new token and update request
            const token = await this.authAction.getAccessToken();
            originalRequest.headers.Authorization = `Bearer ${token}`;

            //   retry the api with new token
            const response = await this.api(originalRequest);

            return response;
          }
          // If we get here, either:
          // 1. It's not a 401 error
          // 2. We already tried refreshing
          // So we should throw the original error
          throw error;
        } catch (error) {
          // if we hit any error during the refresh process
          console.log("Error during refresh the token:", error);

          // If it's refresh fauilre logout the user
          this.authAction.logout();

          // Throw the error for the calling code to handle
          throw error;
        }
      }
    );
  }

  // Helper methods using async/await
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
