// src/components/Navbar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { useCartStore } from '@/store/cartStore';

export default function Navbar() {
  const pathname = usePathname();

  // ดึงจำนวนสินค้าทั้งหมดในตะกร้าจาก store
  const totalItems = useCartStore((state) => state.totalItems);
  // ฟังก์ชันโหลดตะกร้าจาก backend
  const loadCart = useCartStore((state) => state.loadCart);

  // โหลดตะกร้าทุกครั้งที่ Navbar โหลดครั้งแรก
  useEffect(() => {
    loadCart();
  }, [loadCart]);

  const navItems = [
    { label: 'หน้าแรก', href: '/' },
    { label: 'สินค้า', href: '/product' },
    { label: 'ติดต่อเรา', href: '/contact' },
  ];

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
      <div className="container">
        <Link href="/" className="navbar-brand fw-bold text-primary">
          MyShop
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
          aria-controls="mainNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="mainNavbar">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {navItems.map((item) => (
              <li className="nav-item" key={item.href}>
                <Link
                  href={item.href}
                  className={`nav-link ${
                    pathname === item.href ? 'active fw-semibold text-primary' : ''
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}

            {/* ไอคอนตะกร้าพร้อม badge */}
            <li className="nav-item ms-3">
              <Link href="/cart" className="nav-link position-relative">
                <i className="bi bi-cart3 fs-5"></i>
                <span className="visually-hidden">Cart</span>

                {totalItems > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {totalItems}
                  </span>
                )}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
