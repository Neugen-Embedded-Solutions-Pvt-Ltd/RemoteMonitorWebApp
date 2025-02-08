import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import "./App.css";

import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";

import ProtectedRoutes from "./components/ProtectedRoutes";
import RedirectToHome from "./components/RedirectToHome";

const routesConfig = [
  { path: "/login", element: <Login />, isProtected: false },
  { path: "/register", element: <Register />, isProtected: false },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage />,
    isProtected: false,
  },
  {
    path: "/reset-password",
    element: <ResetPasswordPage />,
    isProtected: false,
  },

  { path: "/", element: <HomePage />, isProtected: true },
];
const App = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <BrowserRouter>
      <div className="App h-dvh">
        <Routes>
          {routesConfig.map(({ path, element, isProtected }) =>
            isProtected ? (
              <Route key={path} element={<ProtectedRoutes />}>
                <Route path={path} element={element} />
              </Route>
            ) : (
              <Route key={path} path={path} element={<RedirectToHome>{element}</RedirectToHome>} />
            )
          )}
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
