"use client";

import { Calendar, MapPin, Users, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface TripCardProps {
  id: string;
  title: string;
  destination: string;
  image: string;
  duration: string;
  date: string;
  travelers: number;
  status: "completed" | "upcoming" | "planning";
  highlights: string[];
}

export default function TripCard({
  id,
  title,
  destination,
  image,
  duration,
  date,
  travelers,
  status,
  highlights,
}: TripCardProps) {
  const statusColors = {
    completed: "bg-green-100 text-green-800",
    upcoming: "bg-blue-100 text-blue-800",
    planning: "bg-orange-100 text-orange-800",
  };

  const statusLabels = {
    completed: "Completed",
    upcoming: "Upcoming",
    planning: "Planning",
  };

  return (
    <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200 transform hover:-translate-y-1">
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Status Badge */}
        <div className="absolute top-4 left-4">
          <Badge
            className={`${statusColors[status]} px-3 py-1 text-sm font-medium rounded-full border-0`}
          >
            {statusLabels[status]}
          </Badge>
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
            {title}
          </h3>

          <div className="flex items-center text-gray-600 mb-3">
            <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
            <span className="text-sm">{destination}</span>
          </div>
        </div>

        {/* Trip Details */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center text-gray-600">
            <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
            <span className="text-sm">{date}</span>
          </div>

          <div className="flex items-center text-gray-600">
            <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
            <span className="text-sm">{duration}</span>
          </div>

          <div className="flex items-center text-gray-600 col-span-2">
            <Users className="h-4 w-4 mr-2 flex-shrink-0" />
            <span className="text-sm">
              {travelers} {travelers === 1 ? "Traveler" : "Travelers"}
            </span>
          </div>
        </div>

        {/* Highlights */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {highlights.slice(0, 3).map((highlight, index) => (
              <Badge
                key={index}
                variant="outline"
                className="text-xs px-2 py-1 rounded-full border-gray-200 text-gray-600"
              >
                {highlight}
              </Badge>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-2 font-medium transition-all duration-200 hover:shadow-md">
          {status === "completed"
            ? "View Trip"
            : status === "upcoming"
            ? "View Itinerary"
            : "Continue Planning"}
        </Button>
      </div>
    </div>
  );
}
