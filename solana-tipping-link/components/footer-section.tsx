// components/footer-section.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Zap, Twitter, Github } from "lucide-react";

export function FooterSection() {
  return (
    <footer className="w-full py-6 md:py-12 border-t">
      <div className="container px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 font-semibold">
              <Zap className="h-5 w-5 text-primary" />
              <span>SolanaTipLink</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Create beautiful, shareable payment links for your audience.
            </p>
          </div>
          <div className="grid gap-2">
            <h3 className="font-semibold">Resources</h3>
            <nav className="flex flex-col gap-2 text-sm">
              <Link href="https://solana.com/developers/guides/advanced/actions" className="hover:underline">Documentation</Link>
              <Link href="https://solana.com/developers/" className="hover:underline">Tutorials</Link>
              <Link href="#" className="hover:underline">FAQ</Link>
            </nav>
          </div>
          <div className="grid gap-2">
            <h3 className="font-semibold">Legal</h3>
            <nav className="flex flex-col gap-2 text-sm">
              <Link href="#" className="hover:underline">Privacy Policy</Link>
              <Link href="#" className="hover:underline">Terms of Service</Link>
            </nav>
          </div>
          <div className="grid gap-2">
            <h3 className="font-semibold">Connect</h3>
            <div className="flex gap-3">
              <Button variant="ghost" size="icon" asChild>
                <Link href="https://twitter.com/v_tarang25424" target="_blank">
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="https://github.com/cosmoworker" target="_blank">
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} SolanaTipLink. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
