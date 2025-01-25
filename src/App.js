import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import "./App.css";

import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import store from "./redux/slices/store";
import ProtectedRoutes from "./components/ProtectedRoutes";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";

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
  const persistor = React.useMemo(() => persistStore(store), []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <div className="App h-dvh">
            <Routes>
              {routesConfig.map(({ path, element, isProtected }) =>
                isProtected ? (
                  <Route key={path} element={<ProtectedRoutes />}>
                    <Route path={path} element={element} />
                  </Route>
                ) : (
                  <Route key={path} path={path} element={element} />
                )
              )}
            </Routes>
          </div>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
};

export default App;
