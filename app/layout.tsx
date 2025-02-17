
import type { Metadata } from "next";
import Image from 'next/image';
import "./globals.css";
import { PromptProvider } from '../contexts/promptcontext';

export const metadata: Metadata = {
  title: "Sales Practice Companion",
  description: "Practice your sales pitch with an AI.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  console.log('RootLayout rendered');
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-200">
      <PromptProvider>
        {children}
      </PromptProvider>
      </body>
    </html>
  );
}
