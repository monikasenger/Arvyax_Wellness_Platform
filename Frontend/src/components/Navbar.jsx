import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FiLogIn, FiUserPlus, FiLogOut, FiCalendar, FiUser } from "react-icons/fi";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 text-white px-6 py-4 flex justify-between items-center shadow-lg backdrop-blur-md bg-opacity-90 sticky top-0 z-50">
      {/* Logo / App Name */}
      <div className="flex items-center space-x-3">
        {/* Icon Image */}
        <img
          src="/icon.png"
          alt="App Icon"
          className="w-10 h-10 rounded-full shadow-lg border-2 border-white"
        />

        {/* App Name */}
        <span className="font-extrabold text-2xl tracking-wide hover:scale-105 transition-transform duration-300 drop-shadow-md cursor-pointer">
          Arvyax Wellness Platform
        </span>
      </div>

      {/* Right Side Buttons */}
      <div className="flex items-center space-x-5">
        {user ? (
          <>
            {/* User Name */}
           <span className="hidden md:flex items-center gap-2 text-sm italic opacity-90">
  <FiUser className="text-yellow-300 text-lg" />
  <span>
    Hello, <span className="font-semibold">{user.name || "User"}</span>
  </span>
</span>


            {/* My Sessions Link */}
            <Link
              to="/my-sessions"
              className="relative font-medium px-4 py-2 rounded-full 
              bg-white/90 text-blue-700 shadow-md flex items-center gap-2
              hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-600 hover:text-white 
              transition-all duration-300"
            >
              <FiCalendar /> My Sessions
            </Link>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="relative font-medium px-4 py-2 rounded-full 
              bg-red-500 text-white shadow-md flex items-center gap-2
              hover:bg-gradient-to-r hover:from-red-500 hover:to-pink-600 
              transition-all duration-300"
            >
              <FiLogOut /> Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="relative font-medium px-4 py-2 rounded-full 
              bg-white/90 text-blue-700 shadow-md flex items-center gap-2
              hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-600 hover:text-white 
              transition-all duration-300"
            >
              <FiLogIn /> Login
            </Link>
            <Link
              to="/register"
              className="relative font-semibold px-4 py-2 rounded-full 
              bg-yellow-400 text-gray-900 shadow-md flex items-center gap-2
              hover:bg-gradient-to-r hover:from-yellow-400 hover:to-orange-500 hover:text-white
              transition-all duration-300"
            >
              <FiUserPlus /> Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
