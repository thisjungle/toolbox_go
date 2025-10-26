import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'CW/ECW Classification Wizard',
  description: 'Worker classification tool for Building and Construction General On-site Award MA000020',
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
