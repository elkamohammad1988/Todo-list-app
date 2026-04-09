import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

/**
 * Get current user plan from Firestore
 * @returns {Promise<string>} "free" | "pro"
 */
export async function getUserPlan() {
  try {
    if (!auth.currentUser) return "free";

    const ref = doc(db, "users", auth.currentUser.uid);
    const snap = await getDoc(ref);

    if (snap.exists()) {
      return snap.data().plan || "free";
    }

    return "free";
  } catch (error) {
    console.error("Failed to fetch user plan:", error);
    return "free"; // fallback plan
  }
}

/**
 * Check if plan is Pro
 * @param {string} plan
 * @returns {boolean}
 */
export function isPro(plan) {
  return plan === "pro";
}
