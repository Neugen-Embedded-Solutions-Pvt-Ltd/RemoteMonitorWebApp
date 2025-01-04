import "./App.css";

import HomePage from "./pages/HomePage";
import Login from "./pages/Login";  
import Register from "./pages/Register";  

import React from "react";
import { 
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router";
import { Provider } from "react-redux";
import { store } from "./redux/slices/store";

function RoutesApp() {
  return (
    <div className="App h-dvh">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to={"/register"} />} />

          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <RoutesApp />
    </Provider>
  );
}

export default App;
