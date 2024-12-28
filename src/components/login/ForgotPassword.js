import React, { useState } from "react";
import Api from "../utils/api";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  let errorFeild = document.getElementById("errorMsg");
  const navigate = useNavigate();
  const [username, setUsername] = useState({
    username: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsername((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const fetchData = async () => {
      try {
        console.log(username);
        const response = await Api.post("/auth/forgotpassword", username);
        let responseData = response.data;
        if (response.status === 200) {
          errorFeild.innerHTML = responseData.message;
        }
      } catch (error) {
        console.log(error);
        let response = error.response.data;
        console.log(response);
        if (response.status) {
          errorFeild.classList.add("error-message-popup");
          errorFeild.innerHTML = response.message;
        } else {
          errorFeild.classList.add("error-message-popup");
          errorFeild.innerHTML = "resource not found";
        }
      }
    };
    fetchData();
  };
  const handleForgotUsername = () => {
    navigate("/updateusername");
  };
  return (
    <div className="flex w-full h-full justify-center items-center login-container">
      <div className="neugen-login-container w-full p-8  justify-center">
        <h1 className="font-bold text-center login-title text-white">
          Forgot Password
        </h1>
        <div
          className="text-white mb-2  text-center w-full"
          id="errorMsg"
        ></div>
        <form className="flex flex-col w-full" onSubmit={handleFormSubmit}>
          <div className="neugen-input-group">
            <input
              className="neugen-input focus:outline-none focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
              name="username"
              placeholder="Enter User name"
              onChange={handleChange}
              value={username.username}
              required
            />
          </div>
          <div className="forgot-password-section flex col justify-start mb-2">
            <button
              type="button"
              className="text-sm font-semibold text-white forgot-password-btn"
              id="forgotPassword"
              onClick={handleForgotUsername}
            >
              Forgot Username?
            </button>
          </div>
          <div className="flex justify-center w-full mb-3 login-btn-container">
            <button
              className="neugen-submit-btn w-full text-white"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
