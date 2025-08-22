import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import {
  FiLogIn,
  FiUserPlus,
  FiLogOut,
  FiCalendar,
  FiUser,
  FiMenu,
  FiX,
} from "react-icons/fi";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setMenuOpen(false);
  };

  return (
    <nav className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left: Logo + App Name */}
          <div className="flex items-center gap-3">
            <img
              src="/icon.png"
              alt="App Icon"
              className="w-10 h-10 rounded-full shadow-lg border-2 border-white"
            />
            <span className="font-extrabold text-lg sm:text-xl lg:text-2xl tracking-wide hover:scale-105 transition-transform duration-300 cursor-pointer">
              Arvyax Wellness
            </span>
          </div>

          {/* Center: User Name (always visible) */}
          {user && (
            <span className="flex items-center gap-2 text-sm italic opacity-90 mx-2">
              <FiUser className="text-yellow-300 text-lg" />
              Hello, <span className="font-semibold">{user.name || "User"}</span>
            </span>
          )}

          {/* Right: Desktop Menu */}
          <div className="hidden md:flex items-center gap-5">
            {user ? (
              <>
                <Link
                  to="/my-sessions"
                  className="px-4 py-2 rounded-full bg-white/90 text-blue-700 shadow-md flex items-center gap-2
                  hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-600 hover:text-white 
                  transition-all duration-300"
                >
                  <FiCalendar /> My Sessions
                </Link>

                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-full bg-red-500 text-white shadow-md flex items-center gap-2
                  hover:bg-gradient-to-r hover:from-red-500 hover:to-pink-600 transition-all duration-300"
                >
                  <FiLogOut /> Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-full bg-white/90 text-blue-700 shadow-md flex items-center gap-2
                  hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-600 hover:text-white transition-all duration-300"
                >
                  <FiLogIn /> Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 rounded-full bg-yellow-400 text-gray-900 shadow-md flex items-center gap-2
                  hover:bg-gradient-to-r hover:from-yellow-400 hover:to-orange-500 hover:text-white transition-all duration-300"
                >
                  <FiUserPlus /> Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white text-2xl focus:outline-none"
            >
              {menuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-indigo-800 bg-opacity-95 px-6 py-4 space-y-3">
          {user ? (
            <>
              <Link
                to="/my-sessions"
                onClick={() => setMenuOpen(false)}
                className="block px-4 py-2 rounded-lg bg-white/90 text-blue-700 shadow-md flex items-center gap-2
                hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-600 hover:text-white transition-all duration-300"
              >
                <FiCalendar /> My Sessions
              </Link>

              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 rounded-lg bg-red-500 text-white shadow-md flex items-center justify-center gap-2
                hover:bg-gradient-to-r hover:from-red-500 hover:to-pink-600 transition-all duration-300"
              >
                <FiLogOut /> Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="block px-4 py-2 rounded-lg bg-white/90 text-blue-700 shadow-md flex items-center gap-2
                hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-600 hover:text-white transition-all duration-300"
              >
                <FiLogIn /> Login
              </Link>
              <Link
                to="/register"
                onClick={() => setMenuOpen(false)}
                className="block px-4 py-2 rounded-lg bg-yellow-400 text-gray-900 shadow-md flex items-center gap-2
                hover:bg-gradient-to-r hover:from-yellow-400 hover:to-orange-500 hover:text-white transition-all duration-300"
              >
                <FiUserPlus /> Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
