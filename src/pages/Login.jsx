import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
      "
    >
      <form
        onSubmit={handleLogin}
        className="
          w-96
          p-8 space-y-4
          bg-white dark:bg-slate-900
          rounded-xl
          shadow
        "
      >
        <h1
          className="
            text-2xl text-center font-bold
          "
        >Login</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border rounded-lg"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border rounded-lg"
          required
        />

        <button
          type="submit"
          className="
            w-full
            py-3
            text-white
            bg-indigo-600 hover:bg-indigo-700
            rounded-lg
            transition
          "
        >
          Login
        </button>

        <p
          className="
            text-center text-sm
          "
        >
          Don't have an account?{" "}
          <Link
            to="/register"
            className="
              text-indigo-600
            "
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
