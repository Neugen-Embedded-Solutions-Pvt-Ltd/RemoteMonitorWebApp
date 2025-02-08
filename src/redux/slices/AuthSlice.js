import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  isEmailSent: false,
  errors: {
    login: {},
    register: {},
    forgotpassword: {},
    resetpassword: {},
    logout:{},
  },
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    setError: (state, action) => {
      const { formType, fieldName, error } = action.payload;
      state.errors[formType][fieldName] = error;
    },
    removeError: (state, action) => {
      const formType = action.payload;
      state.errors[formType] = {};
    },
    setEmailSent: (state, action) => {
      console.log(action.payload);
      state.isEmailSent = action.payload;
    },
  },
});

export const { setLoading, setUser, setError, removeError, setEmailSent } =
  authSlice.actions;

export default authSlice.reducer;
