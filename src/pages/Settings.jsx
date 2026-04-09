import { useState, useEffect } from "react";

export default function Settings({ dark }) {
  const [notifications, setNotifications] = useState(true);

  // Load saved setting from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("notifications");
    if (saved !== null) setNotifications(JSON.parse(saved));
  }, []);

  // Save setting to localStorage
  useEffect(() => {
    localStorage.setItem("notifications", JSON.stringify(notifications));
  }, [notifications]);

  return (
    <div
      className={`
        max-w-xl p-10 mx-auto rounded-2xl
        ${dark ? "bg-gray-900 text-white" : "bg-white text-gray-900"}
        shadow-lg
      `}
    >
      <h1
        className="
          mb-6
          text-3xl font-bold
        "
      >Settings</h1>

      <div
        className={`
          flex items-center justify-between
          p-4 border rounded-lg
          ${dark ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-gray-100"}
        `}
      >
        <span>Enable Notifications</span>

        <input
          type="checkbox"
          checked={notifications}
          onChange={() => setNotifications(!notifications)}
          className="w-5 h-5 accent-indigo-600 cursor-pointer"
        />
      </div>
    </div>
  );
}