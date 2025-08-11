"use client";

import TripCard from "../cards/trip-card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function PreviousTrips() {
  const trips = [
    {
      id: "1",
      title: "Mediterranean Cruise",
      destination: "Italy, Greece, Turkey",
      image: "/mediterranean-cruise-sunset.png",
      duration: "7 days",
      date: "March 2024",
      travelers: 2,
      status: "completed" as const,
      highlights: ["Colosseum", "Santorini", "Turkish Baths"],
    },
    {
      id: "2",
      title: "Safari Adventure",
      destination: "Kenya & Tanzania",
      image: "/african-safari-elephants-savanna-sunset.png",
      duration: "10 days",
      date: "July 2024",
      travelers: 4,
      status: "upcoming" as const,
      highlights: ["Big Five", "Serengeti", "Masai Culture"],
    },
    {
      id: "3",
      title: "Northern Lights",
      destination: "Iceland & Norway",
      image: "/iceland-aurora-mountains.png",
      duration: "5 days",
      date: "December 2024",
      travelers: 2,
      status: "planning" as const,
      highlights: ["Aurora Viewing", "Ice Caves", "Hot Springs"],
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Your Travel Journey
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl">
              Relive your amazing adventures and plan your next unforgettable
              experience
            </p>
          </div>

          <Button className="mt-6 sm:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center">
            <Plus className="mr-2 h-5 w-5" />
            Plan New Trip
          </Button>
        </div>

        {/* Trip Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {[
            { number: "12", label: "Countries Visited" },
            { number: "28", label: "Cities Explored" },
            { number: "156", label: "Photos Captured" },
            { number: "3", label: "Upcoming Trips" },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className="text-center p-6 bg-gradient-to-br from-blue-50 to-white rounded-2xl border border-blue-100 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-2">
                {stat.number}
              </div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Trips Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trips.map((trip, index) => (
            <div
              key={trip.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${200 + index * 100}ms` }}
            >
              <TripCard {...trip} />
            </div>
          ))}
        </div>

        {/* View All Trips */}
        <div className="text-center mt-12">
          <Button
            variant="outline"
            className="border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 px-8 py-3 rounded-full font-semibold text-lg transition-all duration-200 bg-transparent"
          >
            View All Trips
          </Button>
        </div>
      </div>
    </section>
  );
}
