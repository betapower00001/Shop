// src/components/AdminSidebar.tsx

'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils'; // ถ้ามี className helper

const adminLinks = [
  { href: '/admin', label: 'Dashboard', icon: 'fas fa-tachometer-alt' },
  { href: '/admin/products', label: 'Products', icon: 'fas fa-box' },
  { href: '/admin/orders', label: 'Orders', icon: 'fas fa-receipt' },
  { href: '/admin/users', label: 'Users', icon: 'fas fa-users' },
  { href: '/admin/analytics', label: 'Analytics', icon: 'fas fa-chart-line' },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r p-5">
      <h2 className="text-xl font-bold mb-6">Admin Menu</h2>
      <ul className="space-y-3">
        {adminLinks.map(link => {
          const isActive = pathname === link.href;
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  'flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100',
                  isActive && 'bg-gray-200 font-semibold text-blue-700'
                )}
              >
                <i className={`${link.icon} w-5 text-gray-600`} />
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
