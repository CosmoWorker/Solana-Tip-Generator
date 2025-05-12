// lib/sendSolanaTransaction.ts
import {
  PublicKey,
  SystemProgram,
  Transaction,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";

export async function sendSolanaTransaction({
  to,
  amount,
  sendTransaction,
  publicKey,
  connection,
}: {
  to: string;
  amount: number;
  sendTransaction: any;
  publicKey: any;
  connection: any;
}) {
  if (!connection || !sendTransaction) {
    throw new Error("Missing connection or sendTransaction method");
  }

  const recipientPubkey = new PublicKey(to);

  const transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: publicKey,
      toPubkey: recipientPubkey,
      lamports: amount * LAMPORTS_PER_SOL,
    })
  );

  const { blockhash } = await connection.getLatestBlockhash();
  transaction.recentBlockhash = blockhash;
  transaction.feePayer = publicKey;

  console.log("Transaction built. Submitting...");

  const signature = await sendTransaction(transaction);

  console.log("Transaction sent:", signature);

  await connection.confirmTransaction(signature, "processed");

  console.log("Transaction confirmed!");

  return signature;
}