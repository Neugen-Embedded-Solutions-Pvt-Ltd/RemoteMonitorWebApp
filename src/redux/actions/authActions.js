import validator from "validator";
// import necessary modules and actions
import Api from "../../utils/api";
import {
  setLoading,
  setUser,
  setError,
  removeError,
} from "../slices/AuthSlice.js";
import {
  ForgotPasswordApi,
  loginUserApi,
  resetPasswordApi,
} from "../../services/AuthService.js";

// Helper function to validate email format using RegEx
const sanitizeInput = (input) => {
  const element = document.createElement("div");
  element.innerText = input;
  return element.innerHTML;
};

const validateEmail = (email) => {
  if (typeof email !== "string") {
    throw new TypeError("Input must be a string");
  }
  const sanitizedEmail = sanitizeInput(email);
  return validator.isEmail(sanitizedEmail);
};

// Fields that should not trigger validation errors if empty
const optionalFields = ["last_name", "lastName"];

// Object holding custom error detail for registration form fields
const errorMessages = {
  register: {
    device_id: "Only lowercase alphanumeric characters allowed",
    firstName: "Required field",
    email: "Please enter a valid email address",
    password: "Create a password to secure your account",
    phone: "Phone number is required for verification",
    username: "Choose a unique username",
    general: "Registration failed. Please check your information.",
  },
};

// Validation rules for each field
const validationRules = {
  // device_id: (value) => /^[a-z]+$/.test(value),
  email: (value) => /\S+@\S+\.\S+/.test(value),
  password: (value) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      value
    ),
  phone: (value) => /^\d{10}$/.test(value),
  username: (value) => /^[a-zA-Z0-9_]{3,20}$/.test(value),
};

// Helper function to validate required fields and check if they match validation rules
const validateRequiredFields = (data, formType, dispatch) => {
  let hasErrors = false;
  //Check password and confirm password matching
  if (data.password !== data.confirm_password) {
    dispatch(
      setError({
        formType: "register",
        fieldName: "password",
        error: "Password not match",
      })
    );
  }
  //   loop throw the all the fields
  Object.entries(data).forEach(([field, value]) => {
    // Skip validation for optional fields
    if (optionalFields.includes(field)) return;

    // Skip undefined fields
    if (value === undefined) return;

    // Check if field is empty
    if (!value) {
      dispatch(
        setError({
          formType,
          fieldName: field,
          error: errorMessages[formType][field] || `${field} is required`,
        })
      );
      hasErrors = true;
      return;
    }

    // Apply specific validation rules if they exist
    if (validationRules[field] && !validationRules[field](value)) {
      let errorMessage;

      // Custom validation error messages
      switch (field) {
        // case "device_id":
        //   errorMessage = "Only lowercase alphanumeric characters allowed";
        //   break;
        case "email":
          errorMessage = "Please enter a valid email address";
          break;
        case "password":
          errorMessage = "Password must be at least 8 characters long";
          break;
        case "phone":
          errorMessage = "Please enter a valid 10-digit phone number";
          break;
        case "username":
          errorMessage =
            "Username must be 3-20 characters and can only contain letters, numbers, and underscores";
          break;
        default:
          errorMessage = `Invalid ${field}`;
      }

      //Dispatch error message for invalid fields
      dispatch(
        setError({
          formType,
          fieldName: field,
          error: errorMessage,
        })
      );
      hasErrors = true;
    }
  });

  return hasErrors; //return whether any error found
};

// Action creator for registering user
export const registerUser = (userData, navigate) => async (dispatch) => {
  try {
    // Set loading state to true before starting the registration process
    // dispatch(setLoading(false));
    dispatch(removeError("register")); // Remove any previous errors

    // Validate all required fields
    let hasErrors = validateRequiredFields(userData, "register", dispatch);

    // Additional validations for email and password
    if (userData.email && !validateEmail(userData.email)) {
      dispatch(
        setError({
          formType: "register",
          fieldName: "email",
          error: "Invalid email format",
        })
      );
      hasErrors = true;
    }

    if (userData.password && userData.password.length < 8) {
      dispatch(
        setError({
          formType: "register",
          fieldName: "password",
          error:
            "Must include 1 uppercase, 1 lowercase, 1 number, and 1 symbol (such as !, #, or %)",
        })
      );
      hasErrors = true;
    }

    // Check if password and confirm password not match
    if (userData.password !== userData.password.length) {
      dispatch(
        setError({
          formType: "register",
          fieldName: "password",
          error: "Password and confirm password not same",
        })
      );
      hasErrors = true;
    }

    // If errors exist, stop the registration process
    if (hasErrors) return;

    //Making API request to register the user
    Api.post("/auth/register", userData)
      .then((response) => {
        console.log(response);

        localStorage.setItem("token", response.data.token); // Store the token in localStorage
        dispatch(setUser(response.data)); // Set user data in the store
        alert("login success");

        navigate("/home");
      })
      .catch((error) => {
        console.log(error); // Log the error for debugging
        let response = error.response.data;
        console.log(response);
        if (response.status) {
          // If there is an error status, set general error message
          dispatch(
            setError({
              formType: "register",
              fieldName: "general",
              error: response.message,
            })
          );
        }
      });
  } catch (error) {
    console.log(error);
    // Dispatch error to the store in case of unexpected failure
    dispatch(
      setError({
        formType: "register",
        fieldName: error,
        message: error.message,
      })
    );
  }
};

export const LoginUser = (formData, navigate) => async (dispatch) => {
  try {
    dispatch(setLoading(true)); // Set loading state
    dispatch(removeError("login")); // Clear previous errors

    const data = await loginUserApi(formData); // Call the API
    dispatch(setLoading(false)); // Stop loading

    console.log("login response:", data);

    localStorage.setItem("token", data.token); // Save token
    dispatch(setUser(data)); // Update user state
    navigate("/"); // Navigate to home
  } catch (error) {
    dispatch(setLoading(false)); // Stop loading on error
    console.error("Login error:", error);

    dispatch(
      setError({
        formType: "login",
        fieldName: "general",
        error: error.message || "Something went wrong. Please try again.",
      })
    );
  }
};

export const ForgotPassword = (formData, navigate) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    dispatch(removeError("forgotpassword"));

    const response = await ForgotPasswordApi(formData);
    console.log(response);
    // navigate('/login');
  } catch (error) {
    dispatch(setLoading(false)); // Stop loading on error
    console.log("forgotpassword error:", error);

    dispatch(
      setError({
        formType: "forgotpassword",
        fieldName: "general",
        error: error.message || "Something went wrong. Please try again.",
      })
    );
  }
};

export const ResetPassword = (formData) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    dispatch(removeError("resetpassword"));

    const response = await resetPasswordApi(formData);

    let data = response.data;
    console.log(data);
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setLoading(false)); // Stop loading on error
    console.log("resetpassword error:", error);

    dispatch(
      setError({
        formType: "resetpassword",
        fieldName: "general",
        error: error.message || "Something went wrong. Please try again.",
      })
    );
  }
};
// manoj23878@gmail.com
