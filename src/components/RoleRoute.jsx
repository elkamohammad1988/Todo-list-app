import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { Navigate } from "react-router-dom";

/*
  RoleRoute
  - Checks user role from Firestore
  - Restricts access based on allowedRoles
*/

export default function RoleRoute({ children, allowedRoles }) {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRole = async () => {
      if (!auth.currentUser) {
        setLoading(false);
        return;
      }

      const docRef = doc(db, "users", auth.currentUser.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setRole(docSnap.data().role);
      }

      setLoading(false);
    };

    fetchRole();
  }, []);

  if (loading) return <div
    className="
      p-10
      text-center
    "
  >Loading...</div>;

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/dashboard" />;
  }

  return children;
}
