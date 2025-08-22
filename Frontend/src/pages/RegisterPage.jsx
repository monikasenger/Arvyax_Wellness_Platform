import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import {
  FiUser,
  FiMail,
  FiLock,
  FiCheckCircle,
  FiUserPlus,
  FiLogIn,
} from "react-icons/fi";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await register(name, email, password);
      toast.success("Registration successful! Please login.");
      navigate("/login");
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 px-4 sm:px-6">
      <div className="bg-white/80 backdrop-blur-lg shadow-2xl rounded-2xl p-6 sm:p-8 md:p-10 w-full max-w-sm sm:max-w-md md:max-w-lg border border-gray-200">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-800 text-center mb-2">
          Create Account
        </h2>
        <p className="text-center text-gray-500 mb-6 text-sm sm:text-base">
          Join us and start your journey 🚀
        </p>

        <form className="space-y-4 sm:space-y-5" onSubmit={handleSubmit}>
          {/* Name */}
          <div className="relative">
            <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-base sm:text-lg" />
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-2 sm:py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm text-sm sm:text-base"
            />
          </div>

          {/* Email */}
          <div className="relative">
            <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-base sm:text-lg" />
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-2 sm:py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm text-sm sm:text-base"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-base sm:text-lg" />
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-2 sm:py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm text-sm sm:text-base"
            />
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <FiCheckCircle className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-base sm:text-lg" />
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-2 sm:py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm text-sm sm:text-base"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-2.5 rounded-lg font-semibold shadow-md hover:scale-[1.02] hover:shadow-lg transition-all text-sm sm:text-base"
          >
            <FiUserPlus className="text-base sm:text-lg" /> Register
          </button>
        </form>

        <p className="text-center text-gray-600 text-xs sm:text-sm md:text-base mt-5">
          Already have an account?{" "}
          <Link
            to="/login"
            className="inline-flex items-center gap-1 text-indigo-600 font-medium hover:underline"
          >
            <FiLogIn className="text-xs sm:text-sm" /> Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
