import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Palm2Pay - The Future of Payment is in Your Palm',
  description: 'Biometric payment ecosystem using palm recognition technology',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
