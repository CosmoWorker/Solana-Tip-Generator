import './globals.css';
import { SolanaWalletProvider } from './providers/WalletProvider';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Solana Tipping Link',
  description: 'Tip with Solana via simple links',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SolanaWalletProvider>{children}</SolanaWalletProvider>
      </body>
    </html>
  );
}
