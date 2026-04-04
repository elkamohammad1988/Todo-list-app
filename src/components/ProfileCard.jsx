import { auth } from "../firebase";

export default function ProfileCard() {

  const user = auth.currentUser;

  if (!user) return null;

  return (
    <div
      className="
        p-6
        bg-white dark:bg-gray-800
        rounded-2xl
        shadow-lg
      "
    >
      <h2
        className="
          mb-2
          text-xl font-bold
        "
      >
        Profile
      </h2>

      <p>Email: {user.email}</p>
      <p>UID: {user.uid}</p>
    </div>
  );
}