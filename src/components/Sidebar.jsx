import { Link, useLocation } from "react-router-dom";
import { FaHome, FaUser, FaCog } from "react-icons/fa";

export default function Sidebar({ collapsed }) {
  const location = useLocation();

  const linkClass = (path) =>
    `flex items-center gap-3 p-2 rounded-lg transition ${
      location.pathname === path
        ? "bg-indigo-600 text-white"
        : "hover:bg-gray-700"
    }`;

  return (
    <div
      className="
        h-screen
        p-4
        text-white
        bg-gray-900
        transition-all duration-300
      "
    >
      <div
        className="
          mb-10
          text-center text-xl font-bold
        "
      >
        {collapsed ? "TD" : "Todo Admin"}
      </div>

      <nav
        className="
          space-y-4
        "
      >
        <Link to="/dashboard" className={linkClass("/dashboard")}>
          <FaHome />
          {!collapsed && "Dashboard"}
        </Link>

        <Link to="/profile" className={linkClass("/profile")}>
          <FaUser />
          {!collapsed && "Profile"}
        </Link>

        <Link to="/settings" className={linkClass("/settings")}>
          <FaCog />
          {!collapsed && "Settings"}
        </Link>
      </nav>
    </div>
  );
}
