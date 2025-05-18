'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { useCartStore } from '@/store/cartStore';
import { useSession, signOut } from 'next-auth/react';
import '../Css/navbar.module.css';

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();

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
    <nav className="navbar navbar-expand-lg bg-white shadow-sm sticky-top animated-navbar">
      <div className="container">
        {/* Brand */}
        <Link href="/" className="navbar-brand fw-bold text-primary fs-4">
          MyShop
        </Link>

        {/* Hamburger menu button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
          aria-controls="mainNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar links */}
        <div className="collapse navbar-collapse" id="mainNavbar">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center">
            {navItems.map(({ label, href }) => (
              <li className="nav-item" key={href}>
                <Link
                  href={href}
                  className={`nav-link px-3 transition-link ${
                    pathname === href ? 'active fw-semibold text-primary' : ''
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}

            {/* Cart Icon */}
            <li className="nav-item ms-3">
              <Link href="/cart" className="nav-link position-relative">
                <i className="bi bi-cart3 fs-5"></i>
                <span className="visually-hidden">Cart</span>
                {totalItems > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger animate-badge">
                    {totalItems}
                  </span>
                )}
              </Link>
            </li>

            {/* User Authentication Buttons */}
            {!session ? (
              <>
                <li className="nav-item ms-3">
                  <Link
                    href="/login"
                    className="btn btn-outline-primary btn-sm shadow-sm transition-button"
                  >
                    เข้าสู่ระบบ
                  </Link>
                </li>
                <li className="nav-item ms-3">
                  <Link
                    href="/register"
                    className="btn btn-outline-primary btn-sm shadow-sm transition-button"
                  >
                    สมัครสมาชิก
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item ms-3 d-flex align-items-center">
                  <span className="nav-link text-success fw-semibold mb-0">
                    สวัสดี, {session.user?.name ?? session.user?.email}
                  </span>
                </li>
                <li className="nav-item ms-2">
                  <button
                    className="btn btn-outline-danger btn-sm shadow-sm transition-button"
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
