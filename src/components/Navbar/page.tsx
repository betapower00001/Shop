// src/components/Navbar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { useCartStore } from "@/store/cartStore";
import Image from "next/image";
import Logo from "@/components/Img/logored.png";
import styles from "../Css/navbar.module.css";

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const totalItems = useCartStore((state) => state.totalItems);
  const loadCart = useCartStore((state) => state.loadCart);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    loadCart();

    const handleScroll = () => {
      // ทำเฉพาะหน้าแรกเท่านั้น
      if (pathname === "/") {
        setScrolled(window.scrollY > 100);
      } else {
        setScrolled(true); // หน้าอื่นให้ Navbar ชัดเจนเสมอ
      }
    };

    handleScroll(); // เรียกครั้งแรกตอนโหลด

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadCart, pathname]);


  const navItems = [
    { label: "หน้าแรก", href: "/" },
    { label: "สินค้า", href: "/product" },
    { label: "ติดต่อเรา", href: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-white shadow-md" : "bg-transparent"
        }`}
      style={{
        backgroundColor: scrolled ? "white" : "transparent",
        backdropFilter: "none",
        WebkitBackdropFilter: "none",
        boxShadow: scrolled ? "0 2px 4px rgba(0, 0, 0, 0.1)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="no-underline flex items-center gap-2">
          <Image src={Logo} alt="Shop Logo" width={100} height={40} />
          <span
            className={`text-xl font-bold drop-shadow-md transition-colors duration-300 ${scrolled ? "text-gray-700" : "text-white"
              }`}
          >
            ผ้าคลุมรถยนต์
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navItems.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className={`no-underline text-sm font-medium transition duration-200 ease-in-out ${pathname === href
                  ? "text-blue-600 font-semibold"
                  : scrolled
                    ? "text-gray-700"
                    : "text-white"
                } hover:text-blue-600 hover:opacity-80`}
            >
              {label}
            </Link>
          ))}

          <Link
            href="/cart"
            className={`relative group transition duration-200 ease-in-out ${scrolled ? "text-gray-700" : "text-white"
              } hover:text-blue-600`}
          >
            <i className="bi bi-cart3 text-xl transition-colors duration-200 group-hover:text-blue-600"></i>
            {totalItems > 0 && (
              <span
                className={`absolute -top-2 -right-3 bg-red-600 text-white text-xs rounded-full px-1.5 py-0.5 ${styles["animate-bounce-slow"]}`}
              >
                {totalItems}
              </span>
            )}
          </Link>

          {!session ? (
            <>
              <Link
                href="/login"
                className={`no-underline text-sm transition ${scrolled ? "text-gray-600" : "text-white"
                  } hover:text-blue-600`}
              >
                เข้าสู่ระบบ
              </Link>
              <Link
                href="/register"
                className="no-underline text-sm px-4 py-1.5 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                สมัครสมาชิก
              </Link>
            </>
          ) : (
            <>
              <span className="no-underline text-sm text-green-600 font-medium">
                สวัสดี, {session.user?.name ?? session.user?.email}
              </span>
              <button
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="no-underline text-sm px-4 py-1.5 rounded-md border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition"
              >
                ออกจากระบบ
              </button>
            </>
          )}
        </nav>

        <button
          className={`${scrolled ? "no-underline text-gray-700" : "text-white"
            } md:hidden`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="no-underline md:hidden px-4 pb-4 bg-white animate-slideDown shadow-md space-y-2">
          {navItems.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileMenuOpen(false)}
              className={`no-underline block py-2 text-sm font-medium transition-colors duration-200 ${pathname === href
                  ? "text-blue-600 font-semibold"
                  : "text-gray-700"
                } hover:text-blue-600`}
            >
              {label}
            </Link>
          ))}

          <Link
            href="/cart"
            onClick={() => setMobileMenuOpen(false)}
            className="relative block py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200"
          >
            <i className="bi bi-cart3 text-xl mr-2"></i>
            ตะกร้าสินค้า
            {totalItems > 0 && (
              <span
                className={`absolute top-1.5 left-24 bg-red-600 text-white text-xs rounded-full px-1.5 py-0.5 ${styles["animate-bounce-slow"]}`}
              >
                {totalItems}
              </span>
            )}
          </Link>

          {!session ? (
            <>
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="no-underline block py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition"
              >
                เข้าสู่ระบบ
              </Link>
              <Link
                href="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="no-underline block text-sm font-medium text-white bg-blue-600 px-4 py-1.5 rounded-md hover:bg-blue-700 transition"
              >
                สมัครสมาชิก
              </Link>
            </>
          ) : (
            <>
              <span className="no-underline block py-2 text-sm font-medium text-green-600">
                สวัสดี, {session.user?.name ?? session.user?.email}
              </span>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  signOut({ callbackUrl: "/login" });
                }}
                className="no-underline block w-full text-left text-sm font-medium text-red-500 border border-red-500 px-4 py-1.5 rounded-md hover:bg-red-500 hover:text-white transition"
              >
                ออกจากระบบ
              </button>
            </>
          )}
        </div>
      )}
    </header>
  );
}
