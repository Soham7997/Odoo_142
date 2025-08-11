"use client";

import React, { useState } from "react";
import { signup } from "@/lib/api";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { userStore } from "@/lib/context";

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
  const [photo, setPhoto] = useState<File | null>(null);

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const setUser = userStore((state) => state.setUser);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setPhoto(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => data.append(key, value));
      if (photo) {
        data.append("files", photo); // must match multer's field name
      }

      const userData = await signup(data);
      setUser(userData);

      alert("Signup successful");
      navigate("/");
    } catch (err) {
      alert("Signup failed");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-md space-y-4"
        encType="multipart/form-data"
      >
        <h2 className="text-2xl font-bold text-center">Signup</h2>

        <div>
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label htmlFor="country">Country</Label>
          <Input
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label htmlFor="Additional_Information">
            Additional Information
          </Label>
          <textarea
            id="Additional_Information"
            name="Additional_Information"
            value={formData.Additional_Information}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <div>
          <Label htmlFor="photo">Upload Photo</Label>
          <Input
            id="photo"
            name="photo"
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
          />
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Signing up..." : "Signup"}
        </Button>
      </form>
    </div>
  );
}
