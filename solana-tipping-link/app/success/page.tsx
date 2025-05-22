"use client";

import { useState, useEffect } from "react";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Twitter } from "lucide-react";
import Link from "next/link";

// Dynamically import Confetti with SSR disabled
const Confetti = dynamic(() => import("react-confetti"), { ssr: false });

function SuccessContent() {
  const [mounted, setMounted] = useState(false);
  const searchParams = useSearchParams();

  const amount = searchParams.get("amount");
  const recipient = searchParams.get("recipient");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!amount || !recipient) {
    return (
      <div className="container flex min-h-screen flex-col py-24 items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-destructive">Invalid Link</CardTitle>
            <CardDescription>
              The success page requires valid transaction details (amount and recipient).
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/" passHref>
              <Button>Return to Home</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container flex min-h-screen flex-col py-24 items-center justify-center">
      {/* Render confetti only after mount */}
      {mounted && <Confetti width={window.innerWidth} height={window.innerHeight} />}
      <Card className="max-w-full">
        <CardHeader>
          <CardTitle className="text-green-400 text-2xl font-semibold">Tip Sent Successfully!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-white text-lg">
            You tipped <span className="font-bold">{amount} SOL</span> to{" "}
            <span className="font-bold">{recipient}</span>. 
            <br />
            <span className="ml-50">Thank you for tipping with Solana 💙</span>
          </p>
          <div className="flex justify-between">
            <Button asChild variant="outline">
              <Link
                href={`https://twitter.com/intent/tweet?text=Just+sent+a+tip+on+Solana+via+%40solanatip+%F0%9F%92%A6&url= ${encodeURIComponent(
                  typeof window !== "undefined" ? window.location.origin : "https://yourdomain.com "
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="mr-2 h-4 w-4" />
                Tweet This Tip
              </Link>
            </Button>

            <Button asChild>
              <Link href="/">Make Another Tip</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}