"use client";

import { useRef } from "react";
import DestinationCard from "../cards/destination-card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function TopDestinations() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const destinations = [
    {
      id: "1",
      title: "Santorini Paradise",
      location: "Santorini, Greece",
      image: "/santorini-blue-domes-sunset.png",
      rating: 4.9,
      reviews: 1247,
      price: "$899",
      tags: ["Romantic", "Sunset Views"],
    },
    {
      id: "2",
      title: "Tokyo Adventure",
      location: "Tokyo, Japan",
      image: "/tokyo-cherry-blossoms-city.png",
      rating: 4.8,
      reviews: 892,
      price: "$1,299",
      tags: ["Culture", "Food"],
    },
    {
      id: "3",
      title: "Bali Retreat",
      location: "Ubud, Bali",
      image: "/ubud-rice-temple.png",
      rating: 4.7,
      reviews: 654,
      price: "$699",
      tags: ["Wellness", "Nature"],
    },
    {
      id: "4",
      title: "Swiss Alps",
      location: "Zermatt, Switzerland",
      image: "/swiss-alps-matterhorn-snow.png",
      rating: 4.9,
      reviews: 423,
      price: "$1,599",
      tags: ["Adventure", "Skiing"],
    },
    {
      id: "5",
      title: "Maldives Escape",
      location: "Maldives",
      image: "/placeholder-4simz.png",
      rating: 4.8,
      reviews: 789,
      price: "$2,199",
      tags: ["Luxury", "Beach"],
    },
  ];

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Top Regional Selections
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Discover handpicked destinations that offer unforgettable
            experiences and breathtaking views
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {["All", "Beach", "Mountain", "City", "Adventure", "Luxury"].map(
            (filter) => (
              <Button
                key={filter}
                variant={filter === "All" ? "default" : "outline"}
                className={`rounded-full px-6 py-2 font-medium transition-all duration-200 ${
                  filter === "All"
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "border-gray-200 text-gray-600 hover:border-blue-300 hover:text-blue-600"
                }`}
              >
                {filter}
              </Button>
            )
          )}
        </div>

        {/* Destinations Carousel */}
        <div className="relative">
          {/* Navigation Buttons */}
          <Button
            onClick={() => scroll("left")}
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm border-gray-200 hover:bg-white hover:border-blue-300 rounded-full shadow-lg hidden sm:flex"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          <Button
            onClick={() => scroll("right")}
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm border-gray-200 hover:bg-white hover:border-blue-300 rounded-full shadow-lg hidden sm:flex"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>

          {/* Cards Container */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 scroll-smooth"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {destinations.map((destination, index) => (
              <div
                key={destination.id}
                className="flex-shrink-0 w-80 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <DestinationCard {...destination} />
              </div>
            ))}
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200">
            View All Destinations
          </Button>
        </div>
      </div>
    </section>
  );
}
