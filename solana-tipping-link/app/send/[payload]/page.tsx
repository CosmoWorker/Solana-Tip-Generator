"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner"; // ✅ Use toast from 'sonner'
import { Wallet, CheckCircle2, ArrowLeft} from "lucide-react";
import Link from "next/link";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

interface TipData {
  to: string;
  amount: string;
  message?: string;
}

export default function SendPage() {
  const router=useRouter();
  const params = useParams<{ payload: string }>();
  const [tipData, setTipData] = useState<TipData | null>(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const { connection } = useConnection();
  const { connected, publicKey, sendTransaction } = useWallet();

  useEffect(() => {
    try {
      let decodedPayload = Buffer.from(params.payload, "base64").toString("utf-8");
      decodedPayload = decodedPayload.replace(/[^\x20-\x7F]+/g, "").trim();
      console.log("Cleansed payload: ", decodedPayload);

      const parsedData = JSON.parse(decodedPayload) as TipData;
      
      setTipData(parsedData);
    } catch (error) {
      console.error("Failed to parse payload:", error);
    } finally {
      setLoading(false);
    }
  }, [params.payload]);

  const sendTip = async () => {
    if (!tipData || !connected || !publicKey || !sendTransaction) {
      toast.error("Wallet not connected. Please connect your wallet to send a tip.");
      return;
    }

    try {
      setSending(true);

      const receiverPublicKey = new PublicKey(tipData.to);

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: receiverPublicKey,
          lamports: parseFloat(tipData.amount) * LAMPORTS_PER_SOL,
        })
      );

      const signature = await sendTransaction(transaction, connection);
  

      setSuccess(true);
      setSending(false);

      toast.success("Tip sent successfully!", {
        description: `Transaction ID: ${signature.substring(0, 10)}...`,
      });
      setTimeout(()=>{}, 750);
      router.push(`/success?amount=${tipData.amount}&recipient=${tipData.to}`)
      
    } catch (error) {
      console.error("Error sending tip:", error);
      setSending(false);

      toast.error("Transaction failed. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="container flex min-h-screen flex-col py-24 items-center justify-center">
        <div className="w-full max-w-md text-center">
          <div className="animate-pulse">Loading tip information...</div>
        </div>
      </div>
    );
  }

  if (!tipData) {
    return (
      <div className="container flex min-h-screen flex-col py-24 items-center justify-center">
        <div className="w-full max-w-md text-center">
          <Card>
            <CardHeader>
              <CardTitle className="text-destructive">Invalid Link</CardTitle>
              <CardDescription>
                The tip link you're trying to access is invalid or has expired.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/" passHref>
                <Button>Return to Homepage</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container flex min-h-screen flex-col py-24 items-center justify-center">
      <div className="w-full max-w-lg">
        <div className="flex items-center mb-6">
          <Link href="/" className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="mr-2 h-4 w-4 inline" />
            Back to home
          </Link>
          <div className="flex-1"></div>
          {/* <WalletMultiButton /> */}
        </div>

        <Card className="w-full overflow-hidden border border-gray-700">
          <div className="h-12 bg-gradient-to-r from-violet-600 to-blue-600"></div>
          <CardHeader>
            <CardTitle className="text-xl text-white">Send Tip</CardTitle>
            {tipData.message && ( 
              <CardDescription className="text-gray-400">"{tipData.message}"</CardDescription>
            )}
          </CardHeader>
          <CardContent className="space-y-6 px-4">
            {success ? (
              <div className="text-center p-6 space-y-4">
                <div className="flex justify-center">
                  <CheckCircle2 className="h-16 w-16 text-green-500" />
                </div>
                <h3 className="text-xl font-semibold text-white">Tip Sent Successfully!</h3>
                <p className="text-muted-foreground">
                  Thank you for your support. Your tip has been sent.
                </p>
              </div>
            ) : (
              <>
                
                <div className="w-full">
                  <p className="text-muted-foreground">Recipient:</p>
                  <p className="font-semibold text-white">{tipData.to}</p>
                </div>
                
                <div className="mb-4">
                  <p className="text-muted-foreground">Amount:</p>
                  <p className="font-semibold text-white">{tipData.amount} SOL</p>
                </div>
                <Separator className="bg-gray-700"/>
                <div>
                  <h3 className="text-lg font-medium mb-2 text-white">Send a Tip</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Connect your Solana wallet to send a tip directly.
                  </p>
                  {connected ? (
                    <Button
                      className="w-full bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 cursor-pointer"
                      onClick={sendTip}
                      disabled={sending}
                    >
                      {sending ? (
                        "Processing..."
                      ) : (
                        <>
                          <Wallet className="mr-2 h-4 w-4" />
                          Send {tipData.amount} SOL
                        </>
                      )}
                    </Button>
                  ) : (
                    <WalletMultiButton
                      className="w-full bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700"
                    />
                  )}
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
