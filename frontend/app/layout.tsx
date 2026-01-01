import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import type { ReactNode } from 'react';

import ChatBubble from '@/components/Chatbot/ChatBubble';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Interactive Portfolio | Full-Stack & AI Developer',
  description:
    'A modern portfolio showcasing my projects, skills, and experience as a Full-Stack and AI Developer.',
  keywords: ['portfolio', 'developer', 'full-stack', 'AI', 'next.js', 'react', 'typescript'],
  authors: [{ name: 'Your Name' }],
  creator: 'Your Name',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.className} antialiased min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
      >
        <div className="flex flex-col min-h-screen">
          <main className="flex-1">{children}</main>
        </div>
        <ChatBubble />
      </body>
    </html>
  );
}
