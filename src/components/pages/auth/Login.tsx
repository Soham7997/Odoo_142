"use client";

import React, { useState } from "react";
import { Eye, EyeOff, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "@/lib/api";
import { userStore } from "@/lib/context";

export default function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userAvatar] = useState("");

  const navigate = useNavigate();
  const setUser = userStore((state) => state.setUser);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const userData = await login({
        username: formData.username,
        password: formData.password,
      });

      if (!userData) {
        throw new Error("No user data received");
      }

      setUser(userData);
      navigate("/");
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm rounded-lg overflow-hidden">
          {/* Header Section */}
          <div className="text-center p-6 pb-4">
            {/* Centered Avatar */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-lg">
                {userAvatar ? (
                  <img
                    src={userAvatar || "/placeholder.svg"}
                    alt="User Avatar"
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <User className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                )}
              </div>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
              Welcome Back
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              Sign in to your account
            </p>
          </div>

          {/* Form Section */}
          <div className="px-6 pb-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="Enter your username"
                  autoComplete="username"
                  className="w-full h-11 sm:h-12 px-3 border-2 border-blue-200 focus:border-blue-400 rounded-lg bg-white/50 backdrop-blur-sm transition-all duration-200 focus:outline-none text-sm sm:text-base"
                  required
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    className="w-full h-11 sm:h-12 px-3 pr-12 border-2 border-blue-200 focus:border-blue-400 rounded-lg bg-white/50 backdrop-blur-sm transition-all duration-200 focus:outline-none text-sm sm:text-base"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                    ) : (
                      <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <div className="text-red-500 text-xs sm:text-sm text-center bg-red-50 p-2 sm:p-3 rounded-lg">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 sm:h-12 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Signing In...</span>
                  </div>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            <div className="text-center space-y-3 mt-6">
              <Link
                to="/forgot-password"
                className="block text-xs sm:text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors"
              >
                Forgot your password?
              </Link>
              <div className="text-xs sm:text-sm text-gray-600">
                {"Don't have an account? "}
                <Link
                  to="/signup"
                  className="text-blue-600 hover:text-blue-800 font-semibold hover:underline transition-colors"
                >
                  Sign up here
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
