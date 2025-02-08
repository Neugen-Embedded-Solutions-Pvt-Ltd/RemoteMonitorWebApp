import axios from "axios";  

const createApiInstance = () => {
  const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
    },
  });

  instance.interceptors.request.use(
    (config) => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (error) {
        console.error("Error retrieving token from localStorage:", error);
      }
      return config;
    },
    (error) => {
      console.error("Request Interceptor Error:", error);
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      const defaultErrorMessage = "An unexpected error occurred";

      if (error.code === "ECONNABORTED") {
        console.error("Request Timeout Error:", error);
        return Promise.reject({
          message: "Request timed out. Please try again.",
        });
      } 
      if (error.response) {
        console.error("Server Response Error:", error.response);
        const serverMessage =
          error.response.data?.message || defaultErrorMessage;
        return Promise.reject({
          status: error.response.status,
          message: serverMessage,
        });
      }

      if (error.request) {
        console.error("No Response from Server:", error.request);
        return Promise.reject({
          message: "No response from server. Please check your connection.",
        });
      }

      console.error("Unexpected Error:", error);
      return Promise.reject({
        message: defaultErrorMessage,
      });
    }
  );
  return instance;
};

const Api = createApiInstance();
export default Api;
