import { Link, useLocation } from "react-router-dom";
import { FaHome, FaUser, FaCog } from "react-icons/fa";

export default function Sidebar({ collapsed, dark }) {
  const location = useLocation();

  const linkClass = (path) =>
    `flex items-center gap-3 p-2 rounded-lg transition
      ${location.pathname === path ? "bg-indigo-600 text-white" : dark ? "hover:bg-gray-700 text-gray-200" : "hover:bg-gray-200 text-gray-900"}`;

  return (
    <div
      className={`
        h-screen p-4 transition-all duration-300
        ${dark ? "bg-gray-900 text-gray-200" : "bg-gray-100 text-gray-900"}
      `}
    >
      <div
        className="
          mb-10
          text-center text-xl font-bold
        "
      >{collapsed ? "TD" : "Todo Admin"}</div>

      <nav
        className="
          space-y-4
        "
      >
        <Link to="/dashboard" className={linkClass("/dashboard")}>
          <FaHome /> {!collapsed && "Dashboard"}
        </Link>
        <Link to="/profile" className={linkClass("/profile")}>
          <FaUser /> {!collapsed && "Profile"}
        </Link>
        <Link to="/settings" className={linkClass("/settings")}>
          <FaCog /> {!collapsed && "Settings"}
        </Link>
      </nav>
    </div>
  );
}