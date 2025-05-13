"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative w-full py-24 md:py-32 lg:py-40 overflow-hidden bg-black">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-blue-600 to-purple-600 opacity-70 animate-gradient-background">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center bg-opacity-20 [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      </div>
      
      {/* Hero content */}
      <div className="container relative px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-8 text-center text-white">
          <div className="space-y-3">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500">
              Get Tipped in Solana
            </h1>
            <p className="mx-auto max-w-[700px] text-lg sm:text-xl md:text-2xl">
              Easily create shareable payment links and receive Solana tips instantly, anywhere, anytime. No hassle, just rewards.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/create" passHref>
              <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer">
                Get Started 
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="#features" passHref>
              <Button variant="outline" size="lg" className="text-white border-white hover:border-indigo-500 hover:text-indigo-500">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Floating illustrations with a techy vibe */}
      <div className="absolute top-1/3 -left-40 w-80 h-80 bg-indigo-500/30 rounded-full blur-3xl animate-floating-glow"></div>
      <div className="absolute bottom-1/4 -right-40 w-80 h-80 bg-purple-500/30 rounded-full blur-3xl animate-floating-glow [animation-delay:2s]"></div>
    </section>
  );
}
