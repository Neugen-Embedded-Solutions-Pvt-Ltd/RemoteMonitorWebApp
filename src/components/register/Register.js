import React, { useState } from "react";
import Api from "../utils/api";
import { useNavigate } from "react-router-dom";

// const {checkValidPassword  } = require('../../helpers');

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    device_id: "",
    username: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const register = (e) => {
    e.preventDefault();
    const { firstName, lastName, email, password, confirmPassword, device_id } =
      formData;
    console.log(formData);
    if (password !== confirmPassword) {
      return alert("password not match");
    }

    if (firstName && lastName && email && password && device_id) {
      Api.post("/auth/register", formData)
        .then((response) => {
          console.log(response.data);
          localStorage.setItem("token", response.data.token);
          alert(response.data.message);
          if (response.data.status === 400) {
            // not found resource in DB
            return alert(response.data.message);
          }
          navigate("/home");
        })
        .catch((error) => {
          console.log(error.response.message);
        });
    } else {
      alert("invalid input");
    }
  };

  return (
    // <>
    <div className="flex w-full h-full justify-center items-center login-container">
      <div className="neugen-login-container w-full p-8  justify-center">
        <h1 className="font-bold text-center login-title text-white">
          Create Account
        </h1>
        {/* <p className='text-xl font-normal mb-3  text-center'>Fill the form to create account</p> */}
        <form
          className="flex flex-col w-full"
          id="registerForm"
          onSubmit={register}
        >
          <div className="neugen-input-group">
            {/* <label className='neugen-label' htmlFor='firstName'>Fist Name</label> */}
            <input
              required
              className="neugen-input focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter User name"
            />
          </div>
          <div className="neugen-input-group">
            {/* <label className='neugen-label' htmlFor='firstName'>Fist Name</label> */}
            <input
              required
              className="neugen-input focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
              name="firstName"
              type="text"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Enter Fist Name"
            />
          </div>
          <div className="neugen-input-group">
            {/* <label className='neugen-label' htmlFor='lastName'>Last Name</label> */}
            <input
              className="neugen-input focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
              name="lastName"
              type="text"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Enter Last Name"
            />
          </div>
          <div className="neugen-input-group">
            {/* <label className='neugen-label' htmlFor='email'>Email</label> */}
            <input
              className="neugen-input focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter Email"
              required
            />
          </div>
          <div className="neugen-input-group">
            {/* <label className='neugen-label' htmlFor='password'>Password</label> */}
            <input
              className="neugen-input focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
              name="password"
              id="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
          </div>
          <div className="neugen-input-group">
            {/* <label className='neugen-label' htmlFor='confirmPassword'>Confirm Password</label> */}
            <input
              className="neugen-input focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              required
            />
          </div>
          <div className="neugen-input-group">
            {/* <label className='neugen-label' htmlFor='device_id'>Device id</label> */}
            <input
              className="neugen-input focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
              name="device_id"
              type="text"
              value={formData.device_id}
              onChange={handleChange}
              placeholder="Device Id"
              required
            />
          </div>
          <p className="text-white mb-2">
            we are offring the best of our servvice.the device we acces remotly
            <a href="#d" target="_blank">
              Terms & conditions
            </a>
          </p>
          <div className=" flex items-center mb-2">
            <input
              className="neugen-checkboxes"
              name="consent"
              type="checkbox"
            />
            <label
              className="neugen-label ml-2 mb-0 text-white"
              htmlFor="consent"
            >
              <span className="leading-none">I have read the consent</span>
            </label>
          </div>
          <div className="flex justify-center w-full mb-3">
            {" "}
            <button className="neugen-submit-btn w-full" type="submit">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
    // </>
  );
};

export default Register;
