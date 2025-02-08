// services/authService.js
import Api from "../utils/api"; // Assume you already have an `Api` instance configured

export const registerUserApi = async (formData) => {
  try {
    const response = await Api.post("/auth/register", formData);
    return response.data;
  } catch (error) {
    throw error ? error : { message: "An unexpected error occurred." };
  }
};
export const loginUserApi = async (formData) => {
  try {
    console.log(Api);
    const response = await Api.post("/auth/login", formData);
    console.log(response);
    return response.data;
  } catch (error) {
    throw error ? error : { message: "An unexpected error occurred." };
  }
};

export const ForgotPasswordApi = async (formData) => {
  try {
    const response = await Api.post("/auth/forgotpassword", formData);
    return response;
  } catch (error) {
    throw error ? error : { message: "An unexpected error occurred." };
  }
};

export const resetPasswordApi = async (formData) => {
  try { 
    const response = await Api.put("/auth/resetpassword", formData);
    console.log(response);
    return response;
  } catch (error) {
    console.log(error)
    throw error ? error : { message: "An unexpected error occurred." };
  }
};
