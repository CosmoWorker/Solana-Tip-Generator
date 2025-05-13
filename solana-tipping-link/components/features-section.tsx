// components/features-section.tsx
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { QrCode, Wallet, Share2, Zap } from "lucide-react";

export function FeaturesSection() {
  return (
    <section id="features" className="w-full py-12 md:py-24 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
              Key Features
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
              Everything You Need to Receive Tips
            </h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our platform provides all the tools you need to start receiving Solana tips right away.
            </p>
          </div>
        </div>
        <div className="mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-4 items-stretch py-8 md:py-12">
          <FeatureCard 
            icon={<QrCode className="h-8 w-8 text-primary" />} 
            title="QR Code Generation"
            description="Create QR codes that your audience can scan to send tips instantly."
          />
          <FeatureCard 
            icon={<Wallet className="h-8 w-8 text-primary" />} 
            title="Multiple Wallets"
            description="Support for Phantom, Solflare, and other popular Solana wallets."
          />
          <FeatureCard 
            icon={<Share2 className="h-8 w-8 text-primary" />} 
            title="Shareable Links"
            description="Generate unique links that you can share across all your platforms."
          />
          <FeatureCard 
            icon={<Zap className="h-8 w-8 text-primary" />} 
            title="Instant Payments"
            description="Receive payments directly to your wallet with no middleman."
          />
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <div className="p-2 rounded-lg bg-primary/10 w-fit">
          {icon}
        </div>
        <CardTitle className="mt-4">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardContent>
    </Card>
  );
}
