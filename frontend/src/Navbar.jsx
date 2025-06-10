import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar({ user, onLoginClick, onLogoutClick }) {
  return (
    <nav className="bg-gray-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          AI Code Reviewer
        </Link>

        {/* Navigation Links */}
        <div className="flex gap-6 items-center">
          <NavLink to="/" label="Home" />
          <NavLink to="/review" label="Review" />

          {/* User Info / Auth Button */}
          {user ? (
            <div className="flex gap-4 items-center">
              <span className="text-sm text-gray-300">Welcome, {user}</span>
              <button
                onClick={onLogoutClick}
                className="text-red-400 hover:text-red-600 font-medium transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={onLoginClick}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-pink-600 hover:to-red-500 text-white font-semibold py-2 px-5 rounded-full shadow-md transition-all duration-300 transform hover:scale-105"
            >
              Login / Signup
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

function NavLink({ to, label }) {
  return (
    <Link
      to={to}
      className="relative group text-white font-medium"
    >
      <span className="group-hover:text-pink-400 transition duration-200">{label}</span>
      <span className="block h-0.5 bg-pink-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
    </Link>
  );
}
