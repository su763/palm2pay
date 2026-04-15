import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './tailwind.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Palm2Pay Merchant Dashboard',
  description: 'Merchant point-of-sale dashboard for Palm2Pay biometric payments',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
