import { Routes, Route } from "react-router-dom";
import { useState, useLayoutEffect, Suspense, lazy } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Components
import ProtectedRoute from "./components/ProtectedRoute";
import RoleRoute from "./components/RoleRoute";

// Pages (lazy load)
const Landing = lazy(() => import("./pages/Landing"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Profile = lazy(() => import("./pages/Profile"));
const Settings = lazy(() => import("./pages/Settings"));
const Upgrade = lazy(() => import("./pages/Upgrade"));

function App() {
  // Dark mode state (persistent)
  const [dark, setDark] = useState(
    () => localStorage.getItem("theme") === "dark",
  );

  useLayoutEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");

    document.documentElement.style.transition =
      "background-color 0.3s, color 0.3s";
  }, [dark]);

  const toggleDark = () => setDark((prev) => !prev);

  return (
    <>
      <Suspense
        fallback={
          <div
        className="
          flex flex-col justify-center items-center
          h-screen
          bg-white dark:bg-gray-900
        "
      >
            {/* Spinner */}
            <div
              className="
                w-12 h-12
                border-4 border-indigo-600 border-t-transparent rounded-full
                animate-spin
              "
            ></div>

            {/* Text */}
            <p
              className="
                mt-4
                text-indigo-600 dark:text-indigo-400 font-medium
              "
            >
              Loading...
            </p>
          </div>
        }
      >
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard dark={dark} toggleDark={toggleDark} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <RoleRoute allowedRoles={["admin"]}>
                  <Profile dark={dark} />
                </RoleRoute>
              </ProtectedRoute>
            }
          />

          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <RoleRoute allowedRoles={["admin"]}>
                  <Settings dark={dark} />
                </RoleRoute>
              </ProtectedRoute>
            }
          />

          <Route
            path="/upgrade"
            element={
              <ProtectedRoute>
                <Upgrade dark={dark} />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Suspense>

      {/* Toast notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
