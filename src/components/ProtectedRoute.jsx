import { Navigate } from "react-router-dom";
import { auth } from "../firebase";
import { useEffect, useState } from "react";

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading)
    return (
      <div
        className="
          flex flex-col items-center justify-center
          min-h-screen
          text-gray-700 dark:text-gray-300
          bg-gray-100 dark:bg-gray-900
        "
      >
        <div
          className="
            mb-4
            loader
          "
        ></div>
        <p
          className="
            text-lg font-medium
          "
        >Checking authentication...</p>

        {/* Tailwind spinner */}
        <style>
          {`
            .loader {
              border: 4px solid #f3f3f3;
              border-top: 4px solid #6366F1;
              border-radius: 50%;
              width: 40px;
              height: 40px;
              animation: spin 1s linear infinite;
            }
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
      </div>
    );

  if (!user) return <Navigate to="/" replace />;

  return children;
}