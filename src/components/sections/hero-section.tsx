"use client";

import { useState } from "react";
import { Search, MapPin, Calendar, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("");

  const trendingTags = [
    { name: "Adventure Seeker", color: "bg-purple-100 text-purple-800" },
    { name: "Beach Lover", color: "bg-blue-100 text-blue-800" },
    { name: "Mountain Explorer", color: "bg-green-100 text-green-800" },
    { name: "City Wanderer", color: "bg-orange-100 text-orange-800" },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-100"></div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8 animate-fade-in-up">
          {/* Hero Title */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-gray-900 leading-tight">
              Discover Your Next
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Adventure
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Plan unforgettable journeys with personalized recommendations and
              seamless booking experiences
            </p>
          </div>

          {/* Trending Tags */}
          <div className="flex flex-wrap justify-center gap-3">
            {trendingTags.map((tag, index) => (
              <Badge
                key={tag.name}
                className={`${tag.color} px-4 py-2 text-sm font-medium rounded-full border-0 animate-fade-in-up`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {tag.name}
              </Badge>
            ))}
          </div>

          {/* Search Section */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-xl border border-white/20 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative md:col-span-2">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Where do you want to go?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-3 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl text-base"
                />
              </div>

              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="date"
                  className="pl-10 pr-4 py-3 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl text-base"
                />
              </div>

              <div className="relative">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <select className="w-full pl-10 pr-4 py-3 h-12 border border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl text-base bg-white appearance-none">
                  <option>2 Travelers</option>
                  <option>1 Traveler</option>
                  <option>3 Travelers</option>
                  <option>4+ Travelers</option>
                </select>
              </div>
            </div>

            <Button className="w-full mt-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 h-12 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200">
              <Search className="mr-2 h-5 w-5" />
              Search Destinations
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto pt-8">
            {[
              { number: "50K+", label: "Happy Travelers" },
              { number: "200+", label: "Destinations" },
              { number: "15K+", label: "Reviews" },
              { number: "24/7", label: "Support" },
            ].map((stat, index) => (
              <div
                key={stat.label}
                className="text-center animate-fade-in-up"
                style={{ animationDelay: `${600 + index * 100}ms` }}
              >
                <div className="text-2xl sm:text-3xl font-bold text-blue-600">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
