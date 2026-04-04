import { useState, useEffect } from "react";
import { auth } from "../firebase";
import { updateProfile } from "firebase/auth";

export default function Profile() {
  const [name, setName] = useState("");

  useEffect(() => {
    if (auth.currentUser) {
      setName(auth.currentUser.displayName || "");
    }
  }, []);

  async function handleSave() {
    if (!auth.currentUser) return;

    await updateProfile(auth.currentUser, {
      displayName: name,
    });

    alert("Profile updated successfully!");
  }

  return (
    <div
      className="
        max-w-xl
        p-10 mx-auto
      "
    >
      <h1
        className="
          mb-6
          text-3xl font-bold
        "
      >Profile</h1>

      <div
        className="
          space-y-4
        "
      >
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 border rounded-lg"
        />

        <button
          onClick={handleSave}
          className="
            px-6 py-2
            text-white
            bg-indigo-600
            rounded-lg
          "
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
