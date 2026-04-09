import { useState, useEffect, useRef } from "react";
import { auth } from "../firebase";
import { updateProfile } from "firebase/auth";
import { toast } from "react-toastify";

export default function Profile({ dark }) {
  const [name, setName] = useState("");
  const containerRef = useRef(null);

  // Scroll Animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) entry.target.classList.add("show");
      },
      { threshold: 0.2 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () =>
      containerRef.current && observer.unobserve(containerRef.current);
  }, []);

  // Load initial name
  useEffect(() => {
    if (auth.currentUser) {
      setName(auth.currentUser.displayName || "");
    }
    const savedName = localStorage.getItem("profileName");
    if (savedName) setName(savedName);
  }, []);

  // Save name locally
  useEffect(() => {
    localStorage.setItem("profileName", name);
  }, [name]);

  async function handleSave() {
    if (!auth.currentUser) return;

    try {
      await updateProfile(auth.currentUser, { displayName: name });
      toast.success("Profile updated successfully!");
    } catch (err) {
      toast.error("Error updating profile: " + err.message);
    }
  }

  return (
    <div
      ref={containerRef}
      className={`opacity-0 translate-y-10 transition-all duration-500 max-w-xl p-10 mx-auto rounded-2xl shadow ${
        dark ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
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
          className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
            dark ? "focus:ring-indigo-400 bg-gray-800 text-white" : "focus:ring-indigo-500 bg-white text-black"
          }`}
        />

        <button
          onClick={handleSave}
          className="
            px-6 py-2
            text-white
            bg-indigo-600 hover:bg-indigo-500
            rounded-lg
            transition-all
            transform hover:scale-105
          "
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}