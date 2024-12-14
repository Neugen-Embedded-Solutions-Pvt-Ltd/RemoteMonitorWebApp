import React, { useState } from "react";
import Api from "../utils/api";
import { useNavigate } from "react-router-dom";

const UpdatePassword = () => {
  const navigate = useNavigate();
  let errorFeild = document.getElementById("errorMsg");
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("token");
  const [formData, setFormData] = useState({
    password: "",
    token: token || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      token: prevData.token,
    }));
  };
  let passwordValue = formData.password;
  let confirmPasswordValue = formData.confirm_password;

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const fetchData = async () => {
      if (passwordValue !== confirmPasswordValue) {
        errorFeild.innerHTML = "Password Not match";
        return;
      }
      try {
        const response = await Api.put(`/auth/resetpassword`, formData);
        const responseData = response.data;
        if (response.status === 200) {
          errorFeild.innerHTML = responseData.message;
          navigate("/login");
        }
      } catch (error) {
        console.log(error);
        let response = error.response.data;
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

  return (
    <div className="flex w-full h-full justify-center items-center login-container">
      <div className="neugen-login-container w-full p-8  justify-center">
        <h1 className="font-bold text-center login-title text-white">
          Change Password
        </h1>
        <div
          className="text-white mb-2  text-center w-full"
          id="errorMsg"
        ></div>
        <form className="flex flex-col w-full" onSubmit={handleFormSubmit}>
          <div className="neugen-input-group">
            <input
              className="neugen-input focus:outline-none focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
              name="password"
              type="password"
              placeholder="Enter Password"
              onChange={handleChange}
              value={formData.password}
              required
            />
          </div>
          <div className="neugen-input-group">
            <input
              className="neugen-input focus:outline-none focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
              name="confirm_password"
              type="password"
              placeholder="Enter confirm Password"
              onChange={handleChange}
              value={formData.confirmpassword}
              required
            />
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

export default UpdatePassword;
