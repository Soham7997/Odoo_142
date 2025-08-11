"use client";

import { useState } from "react";
import { Heart, Star, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface DestinationCardProps {
  id: string;
  title: string;
  location: string;
  image: string;
  rating: number;
  reviews: number;
  price: string;
  tags: string[];
  isLiked?: boolean;
}

export default function DestinationCard({
  id,
  title,
  location,
  image,
  rating,
  reviews,
  price,
  tags,
  isLiked = false,
}: DestinationCardProps) {
  const [liked, setLiked] = useState(isLiked);

  return (
    <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200 transform hover:-translate-y-2">
      {/* Image Container */}
      <div className="relative h-48 sm:h-56 overflow-hidden">
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

        {/* Like Button */}
        <button
          onClick={() => setLiked(!liked)}
          className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-all duration-200"
        >
          <Heart
            className={`h-4 w-4 transition-colors duration-200 ${
              liked
                ? "fill-red-500 text-red-500"
                : "text-gray-600 hover:text-red-500"
            }`}
          />
        </button>

        {/* Tags */}
        <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
          {tags.slice(0, 2).map((tag) => (
            <Badge
              key={tag}
              className="bg-white/90 text-gray-800 text-xs px-2 py-1 rounded-full border-0"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 line-clamp-1">
            {title}
          </h3>
          <div className="text-right ml-2">
            <div className="text-lg sm:text-xl font-bold text-blue-600">
              {price}
            </div>
            <div className="text-xs text-gray-500">per person</div>
          </div>
        </div>

        <div className="flex items-center text-gray-600 mb-3">
          <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
          <span className="text-sm line-clamp-1">{location}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium text-gray-900 ml-1">
              {rating}
            </span>
            <span className="text-sm text-gray-500 ml-1">
              ({reviews} reviews)
            </span>
          </div>

          <Button
            size="sm"
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 hover:shadow-md"
          >
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
}
