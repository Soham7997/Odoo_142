"use client";

import React, { useState } from "react";
import { ArrowLeft, Mail, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

// TODO: Replace with your actual API call
async function sendPasswordResetEmail(email: string) {
  // TODO: Implement with your backend API
  // Example: return await api.post('/auth/forgot-password', { email });
  console.log("TODO: Send password reset email to:", email);

  // Mock implementation - replace with actual API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email && email.includes("@")) {
        resolve({
          success: true,
          message: "Password reset email sent successfully",
          email: email,
        });
      } else {
        reject(new Error("Invalid email address"));
      }
    }, 2000);
  });
}

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Basic email validation
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address");
      setIsLoading(false);
      return;
    }

    try {
      const result = await sendPasswordResetEmail(email);
      console.log("Password reset email sent:", result);
      setIsEmailSent(true);
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to send reset email"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendEmail = async () => {
    setIsLoading(true);
    setError("");

    try {
      await sendPasswordResetEmail(email);
      console.log("Password reset email resent");
    } catch (err: any) {
      setError(
        err.response?.data?.message || err.message || "Failed to resend email"
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (isEmailSent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm rounded-lg overflow-hidden">
            {/* Header Section */}
            <div className="text-center p-4 sm:p-6 pb-4">
              {/* Centered Avatar */}
              <div className="flex justify-center mb-4 sm:mb-6">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-lg">
                  <CheckCircle className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
                </div>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
                Check Your Email
              </h1>
              <p className="text-sm sm:text-base text-gray-600">
                We've sent password reset instructions to your email address
              </p>
            </div>

            {/* Content Section */}
            <div className="px-4 sm:px-6 pb-4 sm:pb-6">
              <div className="text-center space-y-4">
                <div className="bg-blue-50 p-3 sm:p-4 rounded-lg border border-blue-200">
                  <Mail className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-xs sm:text-sm text-gray-700">
                    We sent a password reset link to:
                  </p>
                  <p className="font-semibold text-blue-600 break-all text-sm sm:text-base">
                    {email}
                  </p>
                </div>

                <div className="text-xs sm:text-sm text-gray-600 space-y-2">
                  <p>Didn't receive the email? Check your spam folder.</p>
                  <p>The reset link will expire in 24 hours.</p>
                </div>

                <button
                  onClick={handleResendEmail}
                  disabled={isLoading}
                  className="w-full h-11 sm:h-12 border-2 border-blue-200 hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 bg-transparent rounded-lg font-semibold text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                      <span>Resending...</span>
                    </div>
                  ) : (
                    "Resend Email"
                  )}
                </button>

                {error && (
                  <div className="text-red-500 text-xs sm:text-sm text-center bg-red-50 p-2 sm:p-3 rounded-lg">
                    {error}
                  </div>
                )}
              </div>

              <div className="text-center mt-6">
                <Link
                  to="/login"
                  className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-800 font-semibold hover:underline transition-colors text-sm sm:text-base"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Login</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm rounded-lg overflow-hidden">
          {/* Header Section */}
          <div className="text-center p-4 sm:p-6 pb-4">
            {/* Centered Avatar */}
            <div className="flex justify-center mb-4 sm:mb-6">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-lg">
                <Mail className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
              Forgot Password?
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              Enter your email address and we'll send you a link to reset your
              password
            </p>
          </div>

          {/* Form Section */}
          <div className="px-4 sm:px-6 pb-4 sm:pb-6">
            <form onSubmit={handleSubmit} className="space-y-4">
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  autoComplete="email"
                  className="w-full h-11 sm:h-12 px-3 border-2 border-blue-200 focus:border-blue-400 rounded-lg bg-white/50 backdrop-blur-sm transition-all duration-200 focus:outline-none text-sm sm:text-base"
                  required
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
                    <span>Sending Reset Link...</span>
                  </div>
                ) : (
                  "Send Reset Link"
                )}
              </button>
            </form>

            <div className="text-center space-y-3 mt-6">
              <div className="text-xs sm:text-sm text-gray-600">
                Remember your password?{" "}
                <Link
                  to="/login"
                  className="text-blue-600 hover:text-blue-800 font-semibold hover:underline transition-colors"
                >
                  Sign in here
                </Link>
              </div>
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
