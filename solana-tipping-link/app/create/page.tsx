// app/create/page.tsx
"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useState } from "react";
import bs58 from "bs58";

export default function CreatePage() {
  const { publicKey } = useWallet();
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [tipLink, setTipLink] = useState("");

  const handleGenerate = () => {
    if (!publicKey || !amount) return;

    const payload = JSON.stringify({
      to: publicKey.toBase58(),
      amount,
      message,
    });

    const encoded = bs58.encode(Buffer.from(payload));
    setTipLink(`${typeof window !== "undefined" ? window.location.origin : ""}/send/${encoded}`);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-white">Create a Tipping Link</h1>

      <WalletMultiButton />

      {publicKey && (
        <div className="mt-6 space-y-4">
          <input
            type="number"
            min="0"
            step="0.001"
            placeholder="Amount in SOL"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-2 rounded border"
          />

          <input
            type="text"
            placeholder="Message (optional)"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-2 rounded border"
          />

          <button
            onClick={handleGenerate}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Generate Link
          </button>

          {tipLink && (
            <div className="mt-4">
              <p className="text-white">Share this link:</p>
              <code className="block p-2 bg-gray-800 text-green-400 break-all rounded">{tipLink}</code>
            </div>
          )}
        </div>
      )}
    </div>
  );
}