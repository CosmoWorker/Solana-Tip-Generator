// app/page.tsx
"use client";

import Link from "next/link";
import { HeroSection } from "@/components/hero-section";
import { FeaturesSection } from "@/components/features-section";
import { FooterSection } from "@/components/footer-section";
import { Navbar } from "@/components/navbar";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <section className="py-16 px-6 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Start Tipping on Solana Today</h2>
        <Link
          href="/create"
          className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
        >
          Create Your First Tip Link
        </Link>
      </section>
      <FooterSection />
    </main>
  );
}
