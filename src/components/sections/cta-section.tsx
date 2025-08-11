"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-16 sm:py-24 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl animate-float-delayed"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/10 rounded-full blur-lg animate-float-slow"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          {/* Icon */}
          <div className="flex justify-center">
            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl">
              <Sparkles className="h-12 w-12 text-white" />
            </div>
          </div>

          {/* Heading */}
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Ready to Start Your Next
              <span className="block">Adventure?</span>
            </h2>
            <p className="text-xl sm:text-2xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
              Join thousands of travelers who trust GlobalTrotter to create
              unforgettable journeys
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-200 group">
              Plan Your Trip Now
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
            </Button>

            <Button
              variant="outline"
              className="border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 px-8 py-4 rounded-full font-bold text-lg backdrop-blur-sm transition-all duration-200 bg-transparent"
            >
              Explore Destinations
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="pt-8 border-t border-white/20">
            <p className="text-blue-100 mb-4">Trusted by travelers worldwide</p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-70">
              {[
                "50,000+ Happy Travelers",
                "200+ Destinations",
                "24/7 Support",
                "Best Price Guarantee",
              ].map((feature, index) => (
                <div
                  key={feature}
                  className="text-white/80 text-sm font-medium"
                >
                  {feature}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
