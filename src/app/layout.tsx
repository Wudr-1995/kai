import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Kai — Your AI Memory',
  description: 'Your AI conversations, organized. Save, search, and revisit insights from ChatGPT, Claude, and more.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#F9FAFB] antialiased">{children}</body>
    </html>
  );
}
