import { Navigate } from "react-router-dom";
import { auth } from "../firebase";
import { useEffect, useState } from "react";

/*
  ProtectedRoute
  - Ensures user is authenticated
  - Used to protect private pages
*/

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

  if (loading) return <div
    className="
      p-10
      text-center
    "
  >Loading...</div>;

  if (!user) return <Navigate to="/" />;

  return children;
}
