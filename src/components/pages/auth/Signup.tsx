"use client";

import React, { useState } from "react";
import { createAvatar } from "@dicebear/core";
import { lorelei } from "@dicebear/collection";
import { Eye, EyeOff, User, Upload } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "@/lib/api";
import { userStore } from "@/lib/context";

function generateUserAvatar(seed: string) {
  const avatar = createAvatar(lorelei, {
    seed: seed,
    size: 128,
    backgroundColor: ["b6e3f4", "c4b5fd", "fbbf24"],
  });
  return avatar.toDataUri();
}

export default function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
    city: "",
    country: "",
    Additional_Information: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [userAvatar, setUserAvatar] = useState("");

  const navigate = useNavigate();
  const setUser = userStore((state) => state.setUser);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Generate avatar when username changes
    if (name === "username" && value && !photo) {
      setUserAvatar(generateUserAvatar(value));
    }
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhoto(file);

      // Create preview URL for immediate display
      const reader = new FileReader();
      reader.onload = (event) => {
        setUserAvatar(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Basic validation
    if (formData.username.length < 3) {
      setError("Username must be at least 3 characters long");
      setIsLoading(false);
      return;
    }

    if (formData.password !== confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      setIsLoading(false);
      return;
    }

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) =>
        data.append(key, value)
      );
      if (photo) {
        data.append("files", photo); // must match multer's field name
      }

      const userData = await signup(data);
      setUser(userData);

      alert("Signup successful");
      navigate("/");
    } catch (err) {
      setError("Signup failed");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm rounded-lg overflow-hidden">
          {/* Header Section */}
          <div className="text-center p-4 sm:p-6 pb-4">
            {/* Centered Avatar */}
            <div className="flex justify-center mb-4 sm:mb-6">
              <div className="relative">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-lg">
                  {userAvatar ? (
                    <img
                      src={userAvatar}
                      alt="User Avatar"
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <User className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                  )}
                </div>
                <button
                  type="button"
                  onClick={() =>
                    document.getElementById("avatar-upload")?.click()
                  }
                  className="absolute -bottom-1 -right-1 bg-blue-500 hover:bg-blue-600 text-white text-xs px-2 py-1 rounded-full shadow-md flex items-center space-x-1 transition-colors cursor-pointer"
                >
                  <Upload className="w-3 h-3" />
                  <span className="hidden sm:inline">Photo</span>
                </button>
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  className="hidden"
                />
              </div>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
              Create Account
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              Create your new account
            </p>
          </div>

          {/* Form Section */}
          <div className="px-4 sm:px-6 pb-4 sm:pb-6">
            <form
              onSubmit={handleSubmit}
              className="space-y-4"
              encType="multipart/form-data"
            >
              {/* Name Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    First Name
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="Enter first name"
                    className="w-full h-11 sm:h-12 px-3 border-2 border-blue-200 focus:border-blue-400 rounded-lg bg-white/50 backdrop-blur-sm transition-all duration-200 focus:outline-none text-sm sm:text-base"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Enter last name"
                    className="w-full h-11 sm:h-12 px-3 border-2 border-blue-200 focus:border-blue-400 rounded-lg bg-white/50 backdrop-blur-sm transition-all duration-200 focus:outline-none text-sm sm:text-base"
                    required
                  />
                </div>
              </div>

              {/* Username Field */}
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
                  placeholder="Choose a username"
                  className="w-full h-11 sm:h-12 px-3 border-2 border-blue-200 focus:border-blue-400 rounded-lg bg-white/50 backdrop-blur-sm transition-all duration-200 focus:outline-none text-sm sm:text-base"
                  required
                />
              </div>

              {/* Contact Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter email address"
                    className="w-full h-11 sm:h-12 px-3 border-2 border-blue-200 focus:border-blue-400 rounded-lg bg-white/50 backdrop-blur-sm transition-all duration-200 focus:outline-none text-sm sm:text-base"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter phone number"
                    className="w-full h-11 sm:h-12 px-3 border-2 border-blue-200 focus:border-blue-400 rounded-lg bg-white/50 backdrop-blur-sm transition-all duration-200 focus:outline-none text-sm sm:text-base"
                    required
                  />
                </div>
              </div>

              {/* Location Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-gray-700"
                  >
                    City
                  </label>
                  <input
                    id="city"
                    name="city"
                    type="text"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="Enter city"
                    className="w-full h-11 sm:h-12 px-3 border-2 border-blue-200 focus:border-blue-400 rounded-lg bg-white/50 backdrop-blur-sm transition-all duration-200 focus:outline-none text-sm sm:text-base"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Country
                  </label>
                  <input
                    id="country"
                    name="country"
                    type="text"
                    value={formData.country}
                    onChange={handleInputChange}
                    placeholder="Enter country"
                    className="w-full h-11 sm:h-12 px-3 border-2 border-blue-200 focus:border-blue-400 rounded-lg bg-white/50 backdrop-blur-sm transition-all duration-200 focus:outline-none text-sm sm:text-base"
                  />
                </div>
              </div>

              {/* Password Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                      placeholder="Create password"
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
                <div className="space-y-2">
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={handleConfirmPasswordChange}
                      placeholder="Confirm password"
                      className="w-full h-11 sm:h-12 px-3 pr-12 border-2 border-blue-200 focus:border-blue-400 rounded-lg bg-white/50 backdrop-blur-sm transition-all duration-200 focus:outline-none text-sm sm:text-base"
                      required
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600 transition-colors"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                      ) : (
                        <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div className="space-y-2">
                <label
                  htmlFor="Additional_Information"
                  className="block text-sm font-medium text-gray-700"
                >
                  Additional Information
                </label>
                <textarea
                  id="Additional_Information"
                  name="Additional_Information"
                  value={formData.Additional_Information}
                  onChange={handleInputChange}
                  placeholder="Tell us more about yourself (optional)"
                  className="w-full min-h-[80px] sm:min-h-[100px] px-3 py-2 border-2 border-blue-200 focus:border-blue-400 rounded-lg bg-white/50 backdrop-blur-sm transition-all duration-200 resize-none focus:outline-none text-sm sm:text-base"
                />
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
                    <span>Creating Account...</span>
                  </div>
                ) : (
                  "Register User"
                )}
              </button>
            </form>

            <div className="text-center mt-6">
              <div className="text-xs sm:text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-blue-600 hover:text-blue-800 font-semibold hover:underline transition-colors"
                >
                  Sign in here
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
