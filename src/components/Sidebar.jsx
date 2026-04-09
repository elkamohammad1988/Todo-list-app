import { Link, useLocation } from "react-router-dom";
import { FaHome, FaUser, FaCog } from "react-icons/fa";

export default function Sidebar({ collapsed, dark }) {
  const location = useLocation();

  const navLinks = [
    { to: "/dashboard", label: "Dashboard", icon: <FaHome /> },
    { to: "/profile", label: "Profile", icon: <FaUser /> },
    { to: "/settings", label: "Settings", icon: <FaCog /> },
  ];

  const linkStyle = (path) => ({
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "8px 12px",
    borderRadius: "10px",
    textDecoration: "none",
    fontSize: "13px",
    fontWeight: 500,
    transition: "background 0.15s, color 0.15s",
    backgroundColor:
      location.pathname === path ? "rgba(127,119,221,0.2)" : "transparent",
    color:
      location.pathname === path
        ? "#7f77dd"
        : dark
          ? "rgba(255,255,255,0.7)"
          : "rgba(0,0,0,0.5)",
    border:
      location.pathname === path
        ? "1px solid rgba(127,119,221,0.3)"
        : "1px solid transparent",
  });

  return (
    <div
      style={{
        height: "100vh",
        padding: "20px 12px",
        transition: "width 0.3s",
        width: collapsed ? "72px" : "220px",
        backgroundColor: dark ? "#171b26" : "#ffffff",
        borderRight: dark
          ? "1px solid rgba(255,255,255,0.07)"
          : "1px solid rgba(0,0,0,0.07)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Logo */}
      <div
        style={{
          marginBottom: "32px",
          textAlign: "center",
          fontSize: collapsed ? "14px" : "15px",
          fontWeight: 700,
          letterSpacing: "0.05em",
          color: "#7f77dd",
          whiteSpace: "nowrap",
          overflow: "hidden",
        }}
      >
        {collapsed ? "TD" : "Todo Admin"}
      </div>

      {/* Nav */}
      <nav style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        {navLinks.map(({ to, label, icon }) => (
          <Link
            key={to}
            to={to}
            style={linkStyle(to)}
            title={collapsed ? label : ""}
          >
            <span
              style={{
                fontSize: "15px",
                flexShrink: 0,
                color:
                  location.pathname === to
                    ? "#7f77dd"
                    : dark
                      ? "rgba(255,255,255,0.7)"
                      : "rgba(0,0,0,0.5)",
              }}
            >
              {icon}
            </span>
            {!collapsed && (
              <span
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  color:
                    location.pathname === to
                      ? "#7f77dd"
                      : dark
                        ? "rgba(255,255,255,0.7)"
                        : "rgba(0,0,0,0.5)",
                }}
              >
                {label}
              </span>
            )}
          </Link>
        ))}
      </nav>
    </div>
  );
}
