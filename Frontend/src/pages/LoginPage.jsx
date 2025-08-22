import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import { FiMail, FiLock, FiLogIn, FiUserPlus } from "react-icons/fi";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const userData = await login(email, password);
      console.log("Logged in user:", userData);
      navigate("/dashboard");
    } catch (err) {
      setError(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-indigo-100 px-4 sm:px-6">
      <div className="bg-white shadow-2xl rounded-2xl p-6 sm:p-8 md:p-10 w-full max-w-sm sm:max-w-md md:max-w-lg border border-gray-100">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-800 text-center mb-2">
          Welcome Back 👋
        </h2>
        <p className="text-center text-gray-500 mb-6 text-sm sm:text-base">
          Please login to continue
        </p>

        <form className="space-y-4 sm:space-y-5" onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <label
              className="block text-gray-700 mb-1 font-medium text-sm sm:text-base"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-base sm:text-lg" />
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-2 sm:py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition shadow-sm text-sm sm:text-base"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label
              className="block text-gray-700 mb-1 font-medium text-sm sm:text-base"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-base sm:text-lg" />
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-2 sm:py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition shadow-sm text-sm sm:text-base"
              />
            </div>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-xs sm:text-sm">{error}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition-all shadow-md hover:shadow-lg text-sm sm:text-base"
          >
            <FiLogIn className="text-base sm:text-lg" /> Login
          </button>
        </form>

        <p className="text-center text-gray-500 text-xs sm:text-sm md:text-base mt-6">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="inline-flex items-center gap-1 text-blue-600 font-medium hover:underline"
          >
            <FiUserPlus className="text-xs sm:text-sm" /> Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
