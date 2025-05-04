// src/app/layout.tsx
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
import React from "react";

import { Anuphan } from 'next/font/google';

const anuphan = Anuphan({
  subsets: ['thai'],
  weight: ['300', '400', '500', '700'],
  display: 'swap',
})

export const metadata = {
  title: 'Infinity Marketing Network',
  description: '...',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      {/* ใช้ฟอนต์ผ่าน className */}
      <body className={anuphan.className}>{children}</body>
    </html>
  )
}
