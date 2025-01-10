import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { Provider, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

import "./App.css";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";

import store from "./redux/slices/store"; 


function RoutesApp() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return (
    <div className="App h-dvh">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? <HomePage /> : <Navigate to={"/login"} />
            }
          />

          <Route
            path="/home"
            element={
              isAuthenticated ? <HomePage /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/login"
            element={
              !isAuthenticated ? <Login /> : <Navigate to="/home" replace />
            }
          />
          <Route
            path="/register"
            element={
              !isAuthenticated ? <Register /> : <Navigate to="/home" replace />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

function App() {
  let persistor = persistStore(store);
  return (
    <Provider store={store}>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        <RoutesApp />
      </PersistGate>
    </Provider>
  );
}

export default App;
