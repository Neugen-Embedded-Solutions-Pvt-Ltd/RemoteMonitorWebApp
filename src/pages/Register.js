import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useActionState } from "react";
import { registerUser } from "../redux/actions/authActions";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get errors, user data, and loading state from Redux store
  const { errors, user } = useSelector((state) => state.auth);

  // Log user data for debugging
  console.log("user: ", user);

  // State to manage the form data
  const [formdata, setFormdata] = useState({
    device_id: "",
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    password: "",
    confirm_password: "",
  });

  // Handle input change in the form fields
  const handleChange = (e) => {
    setFormdata({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  };

  // Handle registration form submission
  const handleRegister = () => {
    dispatch(registerUser(formdata, navigate)); // Dispatch the registerUser action
  };

  // Redirect to the login page
  const redirectRegister = () => {
    navigate("/login");
  };

  const [state, submitAction, isPending] = useActionState(handleRegister);
  return (
    <div className="register-container m-auto w-full flex flex-col justify-center h-full">
      <h2 className="text-center font-bold mb-3">User Registration </h2>
      <form action={submitAction} className="flex flex-col w-full">
        {/* Form input fields for device_id, first_name, last_name, email, username, password, and confirm_password */}
        {/* Display error messages below each field when necessary */}
        <div className="flex mb-3 w-full gap-x-2">
          <div className="input-wrapper flex flex-col w-inputBox">
            <label className="text-sm ">
              Device ID <span className="required-field"></span>
            </label>
            <input
              type="text"
              name="device_id"
              value={formdata.device_id}
              onChange={handleChange}
              className="border rounded-small bg-transparent px-2"
              required
            />
            {errors.register.device_id && (
              <div className="text-sm error-message">
                {errors.register.device_id}
              </div>
            )}
          </div>
        </div>

        <div className="flex mb-3 w-full gap-x-2">
          <div className="input-wrapper flex flex-col w-inputBox ">
            <label className="text-sm">
              First Name<span className="required-field"></span>
            </label>
            <input
              type="text"
              name="first_name"
              value={formdata.first_name}
              onChange={handleChange}
              className="border rounded-small bg-transparent px-2"
              required
            />
            {errors.register.first_name && (
              <div className="text-sm error-message">
                {errors.register.first_name}
              </div>
            )}
          </div>
          <div className="input-wrapper flex flex-col w-inputBox">
            <label className="text-sm">Last Name</label>
            <input
              type="text"
              name="last_name"
              value={formdata.last_name}
              onChange={handleChange}
              className="border rounded-small bg-transparent px-2"
            />
            {errors.register.last_name && (
              <div className="text-sm error-message">
                {errors.register.last_name}
              </div>
            )}
          </div>
        </div>
        <div className="flex mb-3 w-full gap-x-2">
          <div className="input-wrapper flex flex-col w-full w-inputBox">
            <label className="text-sm">
              Email Address<span className="required-field"></span>
            </label>
            <input
              type="email"
              name="email"
              value={formdata.email}
              onChange={handleChange}
              className="border rounded-small bg-transparent px-2"
            />
            {errors.register.email && (
              <div className="text-sm error-message">
                {errors.register.email}
              </div>
            )}
          </div>
          <div className="input-wrapper flex flex-col w-full w-inputBox">
            <label className="text-sm">
              Username<span className="required-field"></span>
            </label>
            <input
              type="text"
              name="username"
              value={formdata.username}
              onChange={handleChange}
              className="border rounded-small bg-transparent px-2"
              required
            />
            {errors.register.username && (
              <div className="text-sm error-message">
                {errors.register.username}
              </div>
            )}
          </div>
        </div>

        <div className="flex mb-3 w-full gap-x-2">
          <div className="input-wrapper flex flex-col w-full w-inputBox">
            <label className="text-sm">
              Password<span className="required-field"></span>
            </label>
            <input
              type="password"
              name="password"
              value={formdata.password}
              onChange={handleChange}
              className="border rounded-small bg-transparent px-2"
              required
            />
            {errors.register.password && (
              <div className="text-sm error-message">
                {errors.register.password}
              </div>
            )}
          </div>
          <div className="input-wrapper flex flex-col w-full w-inputBox">
            <label className="text-sm">
              Confirm Password<span className="required-field"></span>
            </label>
            <input
              type="password"
              name="confirm_password"
              value={formdata.confirm_password}
              onChange={handleChange}
              className="border rounded-small bg-transparent px-2"
              required
            />
            {errors.register.confirm_password && (
              <div className="text-sm error-message">
                {errors.register.confirm_password}
              </div>
            )}
          </div>
        </div>

        {errors.register.general && (
          <p className="text-sm error-message">{errors.register.general}</p>
        )}
        {/* Add the other form fields similarly for first_name, last_name, email, etc. */}
        {/* Render error messages for each field dynamically */}

        {/* Submit button with loading state */}
        <div className="w-full flex justify-center">
          <button
            className="capitalize text-white submit-btn rounded-md text-base p-2 w-1/2"
            disabled={isPending} // Disable button while submitting
            style={{ width: "50%" }}
          >
            {isPending ? "SUBMITTING..." : "SUBMIT"}
          </button>
        </div>
      </form>
      {/* Redirect to login page if already a user */}
      <div className="flex text-center w-full justify-center mt-2 redirect-wrapper">
        <span className="text-sm"> Existing user?</span>
        <button className="underline ml-2 text-sm " onClick={redirectRegister}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Register;
