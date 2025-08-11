"use client";

import React, { useState } from "react";
import { login } from "@/lib/api";
import { useNavigate } from "react-router-dom";
import { userStore } from "@/lib/context";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const setUser = userStore((state) => state.setUser);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const userData = await login({ username, password });

      if (!userData) {
        throw new Error("No user data received");
      }

      setUser(userData);
      navigate("/");
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-md shadow-md w-full max-w-md space-y-6"
      >
        <h2 className="text-black text-2xl font-semibold text-center">Login</h2>

        {error && (
          <p className="text-red-600 text-center text-sm">{error}</p>
        )}

        <div className="space-y-1">
          <Label htmlFor="username" className="text-black">
            Username
          </Label>
          <Input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoComplete="username"
            className="bg-white text-black"
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="password" className="text-black">
            Password
          </Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
            className="bg-white text-black"
          />
        </div>

        <Button
          type="submit"
          className="w-full border border-black text-black bg-white hover:bg-gray-100"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </Button>
      </form>
    </div>
  );
}
