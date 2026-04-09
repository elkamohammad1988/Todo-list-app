import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { Navigate } from "react-router-dom";

export default function RoleRoute({ children, allowedRoles }) {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRole = async () => {
      if (!auth.currentUser) {
        setLoading(false);
        return;
      }

      try {
        const docRef = doc(db, "users", auth.currentUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setRole(docSnap.data().role);
        }
      } catch (error) {
        console.error("Failed to fetch role:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRole();
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
        >Checking user role...</p>

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

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}