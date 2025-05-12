// app/success/page.tsx
"use client";

import { useState, useEffect } from "react";
import Confetti from "react-confetti";

export default function SuccessPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="p-6 text-center max-w-xl mx-auto">
      {/* Only render confetti after mount (client-side) */}
      {mounted && <Confetti width={window.innerWidth} height={window.innerHeight} />}

      <h1 className="text-3xl font-bold mb-4 text-green-400">Tip Sent Successfully!</h1>
      <p className="mb-6 text-white">Thank you for tipping with Solana 💙</p>

      {/* Safe use of window */}
      <a
        href={`https://twitter.com/intent/tweet?text=Just+sent+a+tip+on+Solana+via+%40solanatip+%F0%9F%92%A6&url= ${encodeURIComponent(
          typeof window !== "undefined" ? window.location.origin : "https://yourdomain.com "
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mb-4"
      >
        🐦 Tweet This Tip
      </a>

      <br />

      <a
        href="/"
        className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
      >
        Make Another Tip
      </a>
    </div>
  );
}