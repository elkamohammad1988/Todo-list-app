import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { FiLogOut, FiMoon, FiSun, FiMenu, FiSearch, FiX } from "react-icons/fi";

export default function Navbar({ dark, toggleDark, toggleSidebar, search, setSearch, plan }) {
  const navigate = useNavigate();

  async function logout() {
    await signOut(auth);
    localStorage.removeItem("token");
    navigate("/");
  }

  return (
    <div
      className={`
        flex items-center justify-between px-6 py-4 shadow-md
        transition-colors duration-300
        ${dark ? "bg-gray-800 text-white" : "bg-white text-black"}
      `}
    >
      <div
        className="
          flex items-center
          gap-4
        "
      >
        {toggleSidebar && (
          <button
            onClick={toggleSidebar}
            className="
              p-2
              hover:bg-gray-600
              rounded
              transition
            "
          >
            <FiMenu size={20} />
          </button>
        )}
        <h1
          className="
            font-bold text-xl
          "
        >Todo Dashboard</h1>
        {plan && <span
          className="
            px-2 py-1
            text-xs
            bg-indigo-600
            rounded-full
          "
        >{plan.toUpperCase()}</span>}
      </div>

      <div
        className="
          relative hidden md:block
          w-64
        "
      >
        <FiSearch
          className="
            absolute left-3 top-1/2
            text-gray-400
            -translate-y-1/2
          "
          size={16} /
        >
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={`
            w-full pl-9 pr-9 py-2 rounded-lg transition
            ${dark ? "bg-gray-700 text-white placeholder-gray-400" : "bg-gray-100 text-black placeholder-gray-600"}
            focus:outline-none
          `}
        />
        {search && (
          <button
            onClick={() => setSearch("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500"
          >
            <FiX size={16} />
          </button>
        )}
      </div>

      <div
        className="
          flex items-center
          gap-4
        "
      >
        {plan === "free" && (
          <button
            onClick={() => navigate("/upgrade")}
            className="px-3 py-2 bg-indigo-600 hover:bg-indigo-700 rounded text-sm transition"
          >
            Upgrade
          </button>
        )}

        <button
          onClick={toggleDark}
          className="
            p-2
            hover:bg-gray-600
            rounded
            transition
          "
        >
          {dark ? <FiSun size={20} /> : <FiMoon size={20} />}
        </button>

        <button
          onClick={logout}
          className="
            flex items-center
            px-3 py-2
            bg-red-600 hover:bg-red-700
            rounded
            transition
            gap-2
          "
        >
          <FiLogOut size={18} /> Logout
        </button>
      </div>
    </div>
  );
}