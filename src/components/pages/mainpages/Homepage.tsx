"use client";

import { useEffect } from "react";
import Navbar from "../../layout/navbar";
import HeroSection from "../../sections/hero-section";
import TopDestinations from "../../sections/top-destinations";
import PreviousTrips from "../../sections/previous-trips";
import CTASection from "../../sections/cta-section";
import Footer from "../../layout/footer";

export default function Homepage() {
  useEffect(() => {
    // Add smooth scrolling behavior
    document.documentElement.style.scrollBehavior = "smooth";

    // Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");
        }
      });
    }, observerOptions);

    // Observe all elements with animation classes
    const animatedElements = document.querySelectorAll(
      ".animate-fade-in-up, .animate-fade-in"
    );
    animatedElements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <HeroSection />
        <TopDestinations />
        <PreviousTrips />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
