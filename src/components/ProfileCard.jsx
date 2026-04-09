import { auth } from "../firebase";
import { FiMail, FiHash } from "react-icons/fi";

export default function ProfileCard() {
  const user = auth.currentUser;

  if (!user) return (
    <div
      className="
        p-6
        text-gray-500 dark:text-gray-400
        bg-gray-100 dark:bg-gray-900
        rounded-2xl
        shadow-lg
      "
    >
      Loading profile...
    </div>
  );

  return (
    <div
      className="
        p-6
        bg-white dark:bg-gray-800
        rounded-2xl
        shadow-lg transition-colors
      "
    >
      <h2
        className="
          mb-4
          text-xl text-gray-800 dark:text-gray-200 font-bold
        "
      >Profile</h2>

      <div
        className="
          flex items-center
          mb-2
          gap-2
        "
      >
        <FiMail
          className="
            text-gray-500 dark:text-gray-400
          "
          /
        >
        <span
          className="
            text-gray-700 dark:text-gray-300
          "
        >{user.email}</span>
      </div>

      <div
        className="
          flex items-center
          gap-2
        "
      >
        <FiHash
          className="
            text-gray-500 dark:text-gray-400
          "
          /
        >
        <span
          className="
            text-gray-700 dark:text-gray-300
          "
        >{user.uid}</span>
      </div>
    </div>
  );
}