import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { userStore } from "@/lib/context";

import {
  Button,
} from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Navbar() {
  const user = userStore((state) => state.user);
  const logout = userStore((state) => state.logout);
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div
            className="flex-shrink-0 cursor-pointer"
            onClick={() => navigate("/")}
            aria-label="Company Logo"
          >
            <img
              className="h-10 w-auto"
              src="/company-logo.png" // your logo path
              alt="Company Logo"
            />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.data?.avatarUrl || ""} alt="User Avatar" />
                      <AvatarFallback>{user.data?.username?.[0]?.toUpperCase() || "U"}</AvatarFallback>
                    </Avatar>
                    <span>{user.data?.username || "User"}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => navigate("/profile")}>
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link to="/signup">
                  <Button variant="link">Signup</Button>
                </Link>
                <Link to="/login">
                  <Button>Login</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {menuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-inner px-4 py-3 space-y-2">
          {user ? (
            <>
              <div className="flex items-center space-x-3 mb-2">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={user.data?.avatarUrl || ""} alt="User Avatar" />
                  <AvatarFallback>{user.data?.username?.[0]?.toUpperCase() || "U"}</AvatarFallback>
                </Avatar>
                <span className="font-semibold text-gray-700">{user.data?.username || "User"}</span>
              </div>
              <Button
                variant="destructive"
                className="w-full"
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/signup" onClick={() => setMenuOpen(false)}>
                <Button variant="link" className="w-full text-left">
                  Signup
                </Button>
              </Link>
              <Link to="/login" onClick={() => setMenuOpen(false)}>
                <Button className="w-full">Login</Button>
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
