"use client";
import { useEffect, useState } from "react";

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Premium travel images from Pexels
  const slides = [
    {
      url: "https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
      title: "Tropical Paradise",
    },
    {
      url: "https://images.pexels.com/photos/1658967/pexels-photo-1658967.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
      title: "Mountain Adventure",
    },
    {
      url: "https://images.pexels.com/photos/1591373/pexels-photo-1591373.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
      title: "City Skyline",
    },
    {
      url: "https://images.pexels.com/photos/1450360/pexels-photo-1450360.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
      title: "Desert Landscape",
    },
    {
      url: "https://images.pexels.com/photos/1476880/pexels-photo-1476880.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
      title: "Ocean Views",
    },
  ];

  // Preload images for better performance
  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = slides.map((slide) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = resolve;
          img.onerror = reject;
          img.src = slide.url;
        });
      });

      try {
        await Promise.all(imagePromises);
        setImagesLoaded(true);
      } catch (error) {
        console.warn("Some images failed to load:", error);
        setImagesLoaded(true); // Continue anyway
      }
    };

    preloadImages();
  }, [slides]);

  // Page load animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Auto-slide functionality with performance optimization
  useEffect(() => {
    if (!imagesLoaded) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length, imagesLoaded]);

  const stats = [
    { number: "150K+", label: "Global Travelers", icon: "🌍" },
    { number: "500+", label: "Dream Destinations", icon: "✈️" },
    { number: "50K+", label: "5-Star Reviews", icon: "⭐" },
    { number: "Award", label: "Winning Service", icon: "🏆" },
  ];

  return (
    <>
      {/* Loading Overlay */}
      {!imagesLoaded && (
        <div className="fixed inset-0 bg-gray-900 flex items-center justify-center z-50 transition-opacity duration-500">
          <div className="text-center space-y-4">
            <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-white text-lg font-medium">
              Loading your adventure...
            </p>
          </div>
        </div>
      )}

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 sm:pt-20">
        {/* Slideshow Background */}
        <div className="absolute inset-0">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out transform ${
                index === currentSlide
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-105"
              }`}
            >
              <img
                src={slide.url}
                alt={slide.title}
                className="w-full h-full object-cover transition-transform duration-1000"
                loading={index === 0 ? "eager" : "lazy"}
                decoding="async"
              />
              <div className="absolute inset-0 bg-black/40"></div>
            </div>
          ))}
        </div>

        {/* Gradient Overlays for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-transparent to-purple-900/20"></div>

        {/* Main Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-8 sm:py-12 lg:py-16">
          <div className="space-y-8 sm:space-y-12">
            {/* Hero Title with Enhanced Animation */}
            <div
              className={`space-y-4 sm:space-y-6 transition-all duration-1000 transform ${
                isLoaded && imagesLoaded
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
              style={{
                transitionDelay: imagesLoaded ? "300ms" : "0ms",
              }}
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold text-white leading-tight tracking-tight px-2">
                <span
                  className={`block transition-all duration-800 transform ${
                    isLoaded && imagesLoaded
                      ? "translate-y-0 opacity-100"
                      : "translate-y-4 opacity-0"
                  }`}
                  style={{ transitionDelay: "500ms" }}
                >
                  Discover Your Next
                </span>
                <span
                  style={{
                    transitionDelay: "700ms",
                    backgroundSize: "200% 200%",
                  }}
                  className={`block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent transition-all duration-800 transform animate-gradient-x ${
                    isLoaded && imagesLoaded
                      ? "translate-y-0 opacity-100"
                      : "translate-y-4 opacity-0"
                  }`}
                >
                  Adventure
                </span>
              </h1>

              <p
                className={`text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed font-light px-4 transition-all duration-800 transform ${
                  isLoaded && imagesLoaded
                    ? "translate-y-0 opacity-100"
                    : "translate-y-4 opacity-0"
                }`}
                style={{ transitionDelay: "900ms" }}
              >
                Embark on extraordinary journeys with our curated experiences
                and world-class travel planning services
              </p>
            </div>

            {/* Stats Section */}
            <div
              className={`grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 max-w-4xl mx-auto transition-all duration-1000 transform ${
                isLoaded && imagesLoaded
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: "1100ms" }}
            >
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center group cursor-default"
                  style={{ transitionDelay: `${1200 + index * 100}ms` }}
                >
                  <div className="text-2xl sm:text-3xl mb-2 transform group-hover:scale-110 transition-transform duration-300">
                    {stat.icon}
                  </div>
                  <div className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-1">
                    {stat.number}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-300 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              style={{
                left: `${10 + i * 15}%`,
                top: `${20 + i * 10}%`,
                animationDelay: `${2000 + i * 500}ms`,
              }}
              className={`absolute w-1 h-1 sm:w-2 sm:h-2 bg-white/20 rounded-full transition-all duration-1000 transform animate-float ${
                isLoaded && imagesLoaded ? "opacity-100" : "opacity-0"
              } ${
                i % 3 === 0
                  ? "animate-float"
                  : i % 3 === 1
                  ? "animate-float-delayed"
                  : "animate-float-slow"
              }`}
            />
          ))}
        </div>
      </section>
    </>
  );
}
