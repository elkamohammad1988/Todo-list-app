import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useLayoutEffect } from "react";

import Landing from "./pages/Landing";
import Upgrade from "./pages/Upgrade";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

import ProtectedRoute from "./components/ProtectedRoute";
import RoleRoute from "./components/RoleRoute";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [dark, setDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useLayoutEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<Landing/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />

        {/* Protected Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard
                dark={dark}
                toggleDark={() => setDark((prev) => !prev)}
              />
            </ProtectedRoute>
          }
        />

        {/* Admin Only Pages */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <RoleRoute allowedRoles={["admin"]}>
                <Profile />
              </RoleRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <RoleRoute allowedRoles={["admin"]}>
                <Settings />
              </RoleRoute>
            </ProtectedRoute>
          }
        />

        {/* Upgrade Page */}
        <Route
          path="/upgrade"
          element={
            <ProtectedRoute>
              <Upgrade />
            </ProtectedRoute>
          }
        />
      </Routes>

      <ToastContainer position="top-right" />
    </BrowserRouter>
  );
}

export default App;
