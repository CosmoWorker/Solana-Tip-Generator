// app/send/[payload]/page.tsx
"use client";

import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import React, { useEffect, useState } from "react";
import bs58 from "bs58";
import { sendSolanaTransaction } from "@/lib/sendSolanaTransaction";
import { PublicKey } from "@solana/web3.js";

export default function SendPage({ params }: { params: Promise<{ payload: string }> }) {
  const [data, setData] = useState<{ to: string; amount: string; message?: string } | null>(null);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const { connected, publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection(); // Ensure we're using the correct connection
  const resolvedParams = React.use(params);

  useEffect(() => {
    try {
      const decoded = bs58.decode(resolvedParams.payload);
      const json = Buffer.from(decoded).toString("utf-8");
      setData(JSON.parse(json));
    } catch (e) {
      setError("Invalid or corrupted tip link.");
    }
  }, [resolvedParams.payload]);

  const handleSend = async () => {
    if (!data || !publicKey || !sendTransaction) {
      setStatus("❌ Missing required data or wallet not connected");
      return;
    }

    const recipientPubkey = new PublicKey(data.to);
    if (!PublicKey.isOnCurve(recipientPubkey)) {
      setStatus("❌ Invalid recipient public key");
      return;
    }

    const amount = parseFloat(data.amount);
    if (isNaN(amount) || amount <= 0) {
      setStatus("❌ Invalid amount");
      return;
    }

    try {
      setStatus("📡 Sending transaction...");
      console.log("📤 Transaction Data:");
      console.log("From:", publicKey.toBase58());
      console.log("To:", recipientPubkey.toBase58());
      console.log("Amount:", amount);

      await sendSolanaTransaction({
        to: data.to,
        amount,
        sendTransaction,
        publicKey,
        connection,
      });

      setStatus("✅ Transaction successful!");
      setTimeout(() => {
        window.location.href = "/success";
      }, 1500);
    } catch (err: any) {
      console.error("🚫 Transaction failed:", err.message || err);
      setStatus(`❌ Transaction failed: ${err.message || "Unknown error"}`);
    }
  };

  if (error) return <p className="text-red-500">{error}</p>;
  if (!data) return <p>Loading...</p>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-white">Send Tip</h1>

      <p className="mb-2 text-gray-300">Recipient: {data.to}</p>
      <p className="mb-2 text-gray-300">Amount: {data.amount} SOL</p>
      {data.message && <p className="mb-4 italic text-gray-400">"{data.message}"</p>}

      {!connected ? (
        <>
          <p className="mb-4 text-yellow-400">Connect wallet to send tip</p>
          <WalletMultiButton />
        </>
      ) : (
        <button
          onClick={handleSend}
          disabled={status.includes("Sending")}
          className={`w-full py-2 px-4 rounded font-semibold ${
            status.includes("Sending")
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700 text-white"
          }`}
        >
          {status.includes("Sending") ? "Sending..." : `Send ${data.amount} SOL`}
        </button>
      )}

      {status && <p className="mt-4 text-lg">{status}</p>}
    </div>
  );
}