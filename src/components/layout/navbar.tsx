"use client";

import { useState, useEffect } from "react";
import { User, ChevronDown, Settings, LogOut } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out ${
        isScrolled
          ? "bg-slate-900/95 backdrop-blur-lg shadow-lg border-b border-slate-700/50"
          : "bg-slate-900/90 backdrop-blur-xl shadow-lg"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-18 lg:h-20">
          {/* Left side - Logo and Company Name */}
          <div className="flex items-center space-x-3 group cursor-pointer">
            {/* Modern Travel Logo */}
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 p-2.5 sm:p-3 rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                {/* Custom airplane SVG icon */}
                <svg
                  className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 text-white transform group-hover:rotate-12 transition-transform duration-300"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.5 4.5L12 3L13.5 4.5L18 9L22.5 7.5L21 9L16.5 12L21 15L22.5 16.5L18 15L13.5 19.5L12 21L10.5 19.5L6 15L1.5 16.5L3 15L7.5 12L3 9L1.5 7.5L6 9L10.5 4.5Z"
                    fill="currentColor"
                    stroke="currentColor"
                    strokeWidth="0.5"
                  />
                </svg>
              </div>

              {/* Floating accent dot */}
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full opacity-80"></div>
            </div>

            {/* Company Name */}
            <div className="flex flex-col">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent group-hover:from-blue-100 group-hover:to-white transition-all duration-300">
                GlobalTrotter
              </h1>
            </div>
          </div>

          {/* Right side - User Profile Section */}
          <div className="flex items-center">
            {/* User Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 sm:space-x-3 p-2 hover:bg-white/20 rounded-xl transition-all duration-200 group"
              >
                {/* User Avatar */}
                <div className="relative">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                    <User className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                </div>

                {/* User Info (hidden on mobile) */}
                <div className="hidden sm:flex flex-col items-start">
                  <span className="text-sm font-semibold text-white">
                    John Doe
                  </span>
                  <span className="text-xs text-slate-300">Premium Member</span>
                </div>

                <ChevronDown
                  className={`h-4 w-4 text-slate-300 transition-transform duration-200 ${
                    showUserMenu ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-100 py-2 z-10">
                  <div className="px-4 py-2 border-b border-slate-100 sm:hidden">
                    <p className="text-sm font-semibold text-slate-800">
                      John Doe
                    </p>
                    <p className="text-xs text-slate-500">Premium Member</p>
                  </div>

                  <button className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-50/80 transition-colors">
                    <User className="h-4 w-4" />
                    <span>Profile</span>
                  </button>

                  <button className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-50/80 transition-colors">
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </button>

                  <hr className="my-2 border-slate-100" />

                  <button className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50/80 transition-colors">
                    <LogOut className="h-4 w-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient line */}
      <div className="h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-30"></div>
    </nav>
  );
}
