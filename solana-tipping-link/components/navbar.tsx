// components/navbar.tsx
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-background/80 border-b border-border/40">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2 font-semibold">
          <Zap className="h-5 w-5 text-primary" />
          <span>SolanaTipLink</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/create" passHref>
            <Button size="sm" variant="ghost" className="cursor-pointer">
              Get Started
            </Button>
          </Link>
          <a href="https://solana.com/developers/guides/advanced/actions" target="_blank" rel="noopener noreferrer">
            <Button size="sm" variant="ghost">
              Docs
            </Button>
          </a>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
