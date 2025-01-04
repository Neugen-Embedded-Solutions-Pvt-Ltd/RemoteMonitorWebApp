import React, { useState } from "react";
import Api from "../utils/api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  let errorFeild = document.getElementById("errorMsg");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const redirectRegister = () => {
    navigate("/register");
  };
  const login = (e) => {
    e.preventDefault();
    Api.post("/auth/login", formData)
      .then((res) => {
        console.log(res.data);

        localStorage.setItem("token", res.data.token);
        alert("login success");
        navigate("/home");
      })
      .catch((error) => {
        console.log(error.response);
        console.log(error);
        let response = error.response.data;
        if (response.status) {
          errorFeild.classList.add("error-message-popup");
          errorFeild.innerHTML = response.message;
        } else {
          errorFeild.classList.add("error-message-popup");
          errorFeild.innerHTML = "resource not found";
        }
      });
  };
  const handleForgotPassword = () => {
    navigate("/forgotpassword");
  };
  return (
    <div className="flex w-full h-full justify-center items-center login-container">
      <div className="neugen-login-container w-full p-8  justify-center">
        <h1 className="font-bold text-center login-title text-white">
          Sign in to your device
        </h1>
        <div
          className="text-white mb-2  text-center w-full"
          id="errorMsg"
        ></div>
        <form className="flex flex-col w-full" id="loginForm" onSubmit={login}>
          <div className="neugen-input-group">
            <input
              className="neugen-input focus:outline-none focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              placeholder="USERNAME"
              required
            />
          </div>
          <div className="neugen-input-group mb-0">
            <input
              className="neugen-input focus:outline-none focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="PASSWORD"
              required
            />
          </div>
          <div className="forgot-password-section flex col justify-start mb-2 mt-2">
            <button
              type="button"
              className="text-sm font-semibold text-white forgot-password-btn"
              id="forgotPassword"
              onClick={handleForgotPassword}
            >
              Forgot Password?
            </button>
          </div>
          <div className="flex justify-center w-full mb-3 login-btn-container">
            <button
              className="neugen-submit-btn w-full text-white"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>

        <div className="flex justify-center">
          <div className="flex text-white">
            Don't have an account?
            <button
              type="button"
              className="text-sm underline ml-2 register-btn"
              id="createAccount"
              onClick={redirectRegister}
            >
              Register New User
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
