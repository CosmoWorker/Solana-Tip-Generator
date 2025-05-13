"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useWallet } from "@solana/wallet-adapter-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import bs58 from "bs58";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Zap } from "lucide-react";

// Form schema
const formSchema = z.object({
  amount: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Amount must be a positive number.",
  }),
  message: z.string().optional(),
});

export default function CreatePage() {
  const router = useRouter();
  const { publicKey } = useWallet();
  const [generatedLink, setGeneratedLink] = useState<string | null>(null);

  // Define form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: "0.1",
      message: "",
    },
  });

  const handleGenerate = (values: z.infer<typeof formSchema>) => {
    if (!publicKey) return;

    const payload = JSON.stringify({
      to: publicKey.toBase58(),
      amount: values.amount,
      message: values.message,
    });

    const encoded = bs58.encode(Buffer.from(payload));
    setGeneratedLink(`${window.location.origin}/send/${encoded}`);
  };

  function copyToClipboard() {
    if (generatedLink) {
      navigator.clipboard.writeText(generatedLink);
    }
  }

  return (
    <div className="container flex min-h-screen flex-col py-24 items-center justify-center">
      <div className="w-full max-w-md">
        <div className="mb-4">
          <WalletMultiButton />
        </div>
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Zap className="h-5 w-5 text-primary mr-2" />
              Create Tip Link
            </CardTitle>
            <CardDescription>
              Generate a shareable link to receive Solana tips
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleGenerate)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount (SOL)</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.01" placeholder="0.1" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Support my content" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 cursor-pointer"
                  disabled={!publicKey}
                >
                  Generate Tip Link
                </Button>
              </form>
            </Form>

            <Separator className="my-4" />

            {generatedLink && (
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium">Share this link:</p>
                  <div className="mt-2 flex items-center gap-2">
                    <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm truncate flex-1">
                      {generatedLink}
                    </code>
                    <Button size="sm" variant="outline" onClick={copyToClipboard} className="cursor-pointer">
                      Copy
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
