'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { useCartStore } from '@/store/cartStore';
import { useSession, signOut } from 'next-auth/react';

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession(); // ตรวจสอบ session

  const totalItems = useCartStore((state) => state.totalItems);
  const loadCart = useCartStore((state) => state.loadCart);

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

            {/* ตะกร้าสินค้า */}
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

            {/* ถ้ายังไม่ login */}
            {!session && (
              <li className="nav-item ms-3">
                <Link href="/login" className="btn btn-outline-primary btn-sm">
                  เข้าสู่ระบบ
                </Link>
              </li>
            )}

            {/* ถ้า login แล้ว */}
            {session && (
              <>
                <li className="nav-item ms-3">
                  <span className="nav-link text-success fw-semibold">
                    สวัสดี, {session.user?.name ?? session.user?.email}
                  </span>
                </li>
                <li className="nav-item ms-2">
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => signOut({ callbackUrl: '/login' })}
                  >
                    ออกจากระบบ
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
