import axios from "axios";

const API_BASE_URL = "http://localhost:3001";

const createApiInstance = () => {
  const instance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Request interceptor
  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response interceptor
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      const defaultErrorMessage = "An unexpected error occurred";

      if (error.response) {
        // Server responded with an error status
        const serverMessage =
          error.response.data?.message || defaultErrorMessage;
        return Promise.reject({
          status: error.response.status,
          message: serverMessage,
        });
      }

      if (error.request) {
        // Request made but no response received
        return Promise.reject({
          message: "No response from server. Please check your connection.",
        });
      }

      // Network or other errors
      return Promise.reject({
        message: defaultErrorMessage,
      });
    }
  );

  return instance;
};

const Api = createApiInstance();
console.log(Api)
export default Api;
