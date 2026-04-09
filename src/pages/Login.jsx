import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { FaEye, FaEyeSlash, FaGoogle, FaGithub } from "react-icons/fa";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);

      if (remember) {
        localStorage.setItem("remember", "true");
      }

      navigate("/dashboard");
    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="
        flex items-center justify-center
        min-h-screen
        p-4
        bg-white dark:bg-gray-900
      "
    >
      <div
        className="
          w-full max-w-md
          p-8 space-y-6
          bg-white dark:bg-gray-800
          border border-gray-200 dark:border-gray-700 rounded-xl
          shadow-md
        "
      >
        {/* Logo */}
        <div
          className="
            space-y-2
            text-center
          "
        >
          <div
            className="
              text-3xl text-indigo-600 font-bold
            "
          >
            Todo<span
              className="
                text-black dark:text-white
              "
            >Pro</span>
          </div>
          <p
            className="
              text-gray-500 dark:text-gray-300 text-sm
            "
          >
            Welcome back! Please login
          </p>
        </div>

        {/* Error */}
        {error && (
          <div
            className="
              text-sm text-red-500 text-center
            "
          >{error}</div>
        )}

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="
            w-full p-3
            border border-gray-300 dark:border-gray-700
            rounded-lg
            bg-white dark:bg-gray-800
            text-black dark:text-white
            focus:outline-none focus:ring-2 focus:ring-indigo-500
          "
        />

        {/* Password */}
        <div
          className="
            relative
          "
        >
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="
              w-full p-3 pr-12
              border border-gray-300 dark:border-gray-700
              rounded-lg
              bg-white dark:bg-gray-800
              text-black dark:text-white
              focus:outline-none focus:ring-2 focus:ring-indigo-500
            "
          />

          <div
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-gray-500 cursor-pointer"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </div>
        </div>

        {/* Options */}
        <div
          className="
            flex justify-between items-center
            text-sm
          "
        >
          <label
            className="
              flex items-center
              text-gray-500
              gap-2
            "
          >
            <input
              type="checkbox"
              checked={remember}
              onChange={() => setRemember(!remember)}
            />
            Remember me
          </label>

          <Link
            to="/forgot-password"
            className="
              text-indigo-600 hover:underline
            "
          >
            Forgot password?
          </Link>
        </div>

        {/* Button */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="
            w-full
            py-3
            text-white font-semibold
            bg-indigo-600 hover:bg-indigo-700
            rounded-lg
            transition disabled:opacity-50
          "
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Divider */}
        <div
          className="
            flex items-center
            gap-3
          "
        >
          <div
            className="
              flex-1
              h-px
              bg-gray-300 dark:bg-gray-700
            "
          ></div>
          <span
            className="
              text-gray-400 text-sm
            "
          >OR</span>
          <div
            className="
              flex-1
              h-px
              bg-gray-300 dark:bg-gray-700
            "
          ></div>
        </div>

        {/* Social Login */}
        <div
          className="
            flex
            gap-3
          "
        >
          <button
            className="
              flex-1 flex items-center justify-center
              p-2
              hover:bg-gray-100 dark:hover:bg-gray-700
              border rounded-lg
              gap-2
            "
          >
            <FaGoogle /> Google
          </button>

          <button
            className="
              flex-1 flex items-center justify-center
              p-2
              hover:bg-gray-100 dark:hover:bg-gray-700
              border rounded-lg
              gap-2
            "
          >
            <FaGithub /> GitHub
          </button>
        </div>

        {/* Register */}
        <p
          className="
            text-center text-gray-500 text-sm
          "
        >
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="
              text-indigo-600 font-semibold
            "
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
