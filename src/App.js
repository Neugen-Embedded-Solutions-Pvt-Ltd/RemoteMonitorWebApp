import "./App.css";

import HomePage from "./components/homepage/HomePage";
import TempratureLive from "./components/homepage/TempratureLive";
import Login from "./components/login/Login";
import ForgotPassword from "./components/login/ForgotPassword";
import UpdatePassword from "./components/login/UpdatePassword";
import Register from "./components/register/Register";
import UpdateUsername from "./components/login/UpdateUsername";
import Socketprogram from "./components/socket/Socketprogram";

import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to={"/login"} />} />

          <Route path="/home" element={<HomePage />} />
  
  
          <Route path="/register" element={<Register />} />
          <Route path="/temprature" element={<TempratureLive />} />
          <Route path="/socket" element={<Socketprogram />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/updatepassword" element={<UpdatePassword />} />
          <Route path="/updateusername" element={<UpdateUsername />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
