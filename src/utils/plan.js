import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

/*
  Get current user plan from Firestore
*/

export async function getUserPlan() {
  if (!auth.currentUser) return "free";

  const ref = doc(db, "users", auth.currentUser.uid);
  const snap = await getDoc(ref);

  if (snap.exists()) {
    return snap.data().plan || "free";
  }

  return "free";
}

/*
  Check if user is Pro
*/
export function isPro(plan) {
  return plan === "pro";
}
