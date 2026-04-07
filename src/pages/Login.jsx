import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div
      className="
        flex items-center justify-center
        min-h-screen
        p-4
        bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500
      "
    >
      <form
        onSubmit={handleLogin}
        className="
          w-full max-w-md
          p-8 space-y-6
          bg-white/20
          border border-white/30 rounded-3xl
          backdrop-blur-2xl shadow-2xl
        "
      >
        <h1
          className="
            text-3xl text-white text-center font-bold
          "
        >Login</h1>

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="inputStyle"
          required
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
            className="inputStyle pr-12"
            required
          />
          <div
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 cursor-pointer text-gray-600 hover:text-gray-800 transition-transform hover:scale-110"
          >
            {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
          </div>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="
            w-full
            py-3
            text-purple-700 font-bold
            bg-white hover:bg-gray-100
            rounded-xl
            shadow-lg transition
          "
        >
          Login
        </button>

        <p
          className="
            text-center text-white
          "
        >
          Don't have an account?{" "}
          <Link
            to="/register"
            className="
              font-semibold underline hover:text-gray-200
            "
          >
            Register
          </Link>
        </p>
      </form>

      {/* Input Style */}
      <style>{`
        .inputStyle {
          width: 100%;
          padding: 12px 16px;
          border-radius: 12px;
          background: rgba(255,255,255,0.9);
          border: none;
          outline: none;
          transition: all 0.3s;
        }

        .inputStyle:focus {
          box-shadow: 0 0 0 3px rgba(255,255,255,0.5);
        }
      `}</style>
    </div>
  );
}
