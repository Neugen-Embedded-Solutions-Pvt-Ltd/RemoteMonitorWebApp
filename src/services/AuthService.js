// services/authService.js
import Api from "../utils/api"; // Assume you already have an `Api` instance configured

export const loginUserApi = async (formData) => {
  try {
  
    const response = await Api.post("/auth/login", formData);
    return response.data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : { message: "An unexpected error occurred." };
  }
};
