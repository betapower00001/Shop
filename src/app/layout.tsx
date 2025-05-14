// src/app/layout.tsx
import { SessionProvider } from 'next-auth/react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
import React from 'react';
import { Anuphan } from 'next/font/google';
import type { Metadata } from 'next';

const anuphan = Anuphan({
  subsets: ['thai'],
  weight: ['300', '400', '500', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Shop',
  description: 'ร้านค้าออนไลน์ ขายสินค้า...',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <head />
      <body className={anuphan.className}>
        <SessionProvider>
          <main>{children}</main>
        </SessionProvider>
      </body>
    </html>
  );
}
