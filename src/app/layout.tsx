// src/app/layout.tsx
import "./globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Anuphan } from "next/font/google";
import type { Metadata } from "next";
import { Providers } from "@/components/Providers";
import Menubar from "@/components/Navbar/page";
import BootstrapClientOnlyLoader from '@/components/BootstrapClientOnlyLoader';



const anuphan = Anuphan({
  subsets: ["thai"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shop",
  description: "ร้านค้าออนไลน์ ขายสินค้า...",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <head /> 
      <body className={anuphan.className}>
        <Providers>
          <Menubar />
          <BootstrapClientOnlyLoader />
          <main>{children}</main>              
        </Providers>
      </body>
    </html>
  );
}
