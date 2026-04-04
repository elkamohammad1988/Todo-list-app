import { useState } from "react";

export default function Settings() {
  const [notifications, setNotifications] = useState(true);

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
      >Settings</h1>

      <div
        className="
          flex items-center justify-between
          p-4
          border rounded-lg
        "
      >
        <span>Enable Notifications</span>

        <input
          type="checkbox"
          checked={notifications}
          onChange={() => setNotifications(!notifications)}
        />
      </div>
    </div>
  );
}
