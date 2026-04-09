import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";

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

  async function handleRegister(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      await sendEmailVerification(userCredential.user);
      toast.success("Verification email sent!");

      await setDoc(doc(db, "users", userCredential.user.uid), {
        firstName,
        lastName,
        phone,
        role: "user",
        createdAt: new Date(),
      });

      navigate("/");
    } catch (error) {
      toast.error(error.message);
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
          w-full max-w-lg
          p-8 space-y-5
          bg-white dark:bg-gray-800
          border border-gray-300 dark:border-gray-700 rounded-xl
          shadow-md
        "
      >
        {/* Title */}
        <h1
          className="
            text-3xl text-center text-black dark:text-white font-bold
          "
        >
          Create Account 🚀
        </h1>

        <form
          onSubmit={handleRegister}
          className="
            space-y-4
          "
        >
          {/* Names */}
          <div
            className="
              grid grid-cols-1 sm:grid-cols-2
              gap-3
            "
          >
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="input"
              required
            />

            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="input"
              required
            />
          </div>

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
            required
          />

          {/* Phone */}
          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="input"
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
              className="input pr-10"
              required
            />

            <div
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-500 cursor-pointer"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
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
              className="input pr-10"
              required
            />

            <div
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-3 text-gray-500 cursor-pointer"
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="
              w-full
              py-3
              text-white font-semibold
              bg-indigo-600 hover:bg-indigo-700
              rounded-lg focus:ring-2 focus:ring-indigo-400
              transition
            "
          >
            Register
          </button>
        </form>

        {/* Login link */}
        <p
          className="
            text-center text-gray-500 dark:text-gray-300 text-sm
          "
        >
          Already have an account?{" "}
          <Link
            to="/"
            className="
              text-indigo-600 font-semibold hover:underline
            "
          >
            Login
          </Link>
        </p>
      </div>

      {/* Shared input style */}
      <style>{`
        .input {
          width: 100%;
          padding: 12px;
          border-radius: 10px;
          border: 1px solid #d1d5db;
          background: white;
          color: #111827;
          outline: none;
          transition: all 0.2s;
        }

        .dark .input {
          background: #1f2937;
          border-color: #374151;
          color: white;
        }

        .input:focus {
          border-color: #6366f1;
          box-shadow: 0 0 0 2px rgba(99,102,241,0.3);
        }
      `}</style>
    </div>
  );
}
