import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { FiLogOut, FiMoon, FiSun, FiMenu, FiSearch, FiX } from "react-icons/fi";

export default function Navbar({
  dark,
  toggleDark,
  toggleSidebar,
  search,
  setSearch,
  plan,
}) {
  const navigate = useNavigate();

  async function logout() {
    await signOut(auth);
    localStorage.removeItem("token");
    navigate("/");
  }

  const iconBtn = {
    padding: "8px",
    borderRadius: "8px",
    background: "transparent",
    border: "1px solid transparent",
    color: dark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)",
    cursor: "pointer",
    transition: "background 0.15s, color 0.15s, border-color 0.15s",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "12px 24px",
        backgroundColor: dark ? "#171b26" : "#ffffff",
        borderBottom: dark
          ? "1px solid rgba(255,255,255,0.07)"
          : "1px solid rgba(0,0,0,0.07)",
      }}
    >
      {/* Left */}
      <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
        {toggleSidebar && (
          <button onClick={toggleSidebar} style={iconBtn}>
            <FiMenu size={18} />
          </button>
        )}

        <h1
          style={{
            fontSize: "15px",
            fontWeight: 600,
            color: dark ? "rgba(255,255,255,0.8)" : "#111",
            letterSpacing: "0.03em",
            margin: 0,
          }}
        >
          Todo Dashboard
        </h1>

        {plan && (
          <span
            style={{
              padding: "3px 10px",
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.06em",
              color: "#7f77dd",
              backgroundColor: "rgba(127,119,221,0.15)",
              border: "1px solid rgba(127,119,221,0.3)",
              borderRadius: "20px",
              textTransform: "uppercase",
            }}
          >
            {plan}
          </span>
        )}
      </div>

      {/* Search */}
      <div style={{ position: "relative", width: "240px" }}>
        <FiSearch
          size={14}
          style={{
            position: "absolute",
            left: "12px",
            top: "50%",
            transform: "translateY(-50%)",
            color: dark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)",
            pointerEvents: "none",
          }}
        />

        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%",
            paddingLeft: "34px",
            paddingRight: search ? "34px" : "12px",
            paddingTop: "8px",
            paddingBottom: "8px",
            borderRadius: "10px",
            backgroundColor: dark
              ? "rgba(255,255,255,0.05)"
              : "rgba(0,0,0,0.05)",
            border: dark
              ? "1px solid rgba(255,255,255,0.07)"
              : "1px solid rgba(0,0,0,0.1)",
            color: dark ? "rgba(255,255,255,0.8)" : "#111",
            fontSize: "13px",
            outline: "none",
            boxSizing: "border-box",
          }}
        />

        {search && (
          <button
            onClick={() => setSearch("")}
            style={{
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "none",
              border: "none",
              color: dark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)",
              cursor: "pointer",
              padding: 0,
              display: "flex",
            }}
          >
            <FiX size={14} />
          </button>
        )}
      </div>

      {/* Right */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        {plan === "free" && (
          <button
            onClick={() => navigate("/upgrade")}
            style={{
              padding: "7px 14px",
              fontSize: "12px",
              fontWeight: 600,
              color: "#7f77dd",
              backgroundColor: "rgba(127,119,221,0.15)",
              border: "1px solid rgba(127,119,221,0.3)",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Upgrade
          </button>
        )}

        <button onClick={toggleDark} style={iconBtn}>
          {dark ? <FiSun size={18} /> : <FiMoon size={18} />}
        </button>

        <button
          onClick={logout}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            padding: "7px 14px",
            fontSize: "12px",
            fontWeight: 600,
            color: "#e24b4a",
            backgroundColor: "rgba(226,75,74,0.1)",
            border: "1px solid rgba(226,75,74,0.25)",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          <FiLogOut size={15} /> Logout
        </button>
      </div>
    </div>
  );
}
