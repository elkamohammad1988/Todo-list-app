import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  function handleRegister(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        alert(error.message);
      });
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
      <div
        className="
          w-full max-w-lg
          p-8 sm:p-10
          bg-white/20
          border border-white/30 rounded-3xl
          backdrop-blur-2xl shadow-2xl
        "
      >
        <h1
          className="
            mb-8
            text-3xl text-white text-center sm:text-4xl font-bold
          "
        >
          Create Account 🚀
        </h1>

        <form
          onSubmit={handleRegister}
          className="
            space-y-5
          "
        >
          {/* Names */}
          <div
            className="
              grid grid-cols-1 sm:grid-cols-2
              gap-4
            "
          >
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="inputStyle"
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="inputStyle"
              required
            />
          </div>

          {/* Email & Phone */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="inputStyle"
            required
          />

          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="inputStyle"
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

          {/* Confirm Password */}
          <div
            className="
              relative
            "
          >
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="inputStyle pr-12"
              required
            />
            <div
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-3 cursor-pointer text-gray-600 hover:text-gray-800 transition-transform hover:scale-110"
            >
              {showConfirmPassword ? (
                <FaEyeSlash size={20} />
              ) : (
                <FaEye size={20} />
              )}
            </div>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="
              w-full
              py-3 mt-4
              text-purple-700 font-bold
              bg-white hover:bg-gray-100
              rounded-xl
              shadow-lg transition
            "
          >
            Register
          </button>
        </form>

        <p
          className="
            mt-6
            text-center text-white
          "
        >
          Already have an account?{" "}
          <Link
            to="/"
            className="
              font-semibold underline hover:text-gray-200
            "
          >
            Login
          </Link>
        </p>
      </div>

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