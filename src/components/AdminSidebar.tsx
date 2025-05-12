// src/components/AdminSidebar.tsx
import Link from 'next/link';

const adminLinks = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/products', label: 'Products' },
  { href: '/admin/orders', label: 'Orders' },
  { href: '/admin/users', label: 'Users' },
  { href: '/admin/analytics', label: 'Analytics' },
];

export default function AdminSidebar() {
  return (
    <aside className="w-64 bg-gray-100 p-4 border-r">
      <h2 className="text-lg font-bold mb-6">Admin Menu</h2>
      <ul>
        {adminLinks.map(link => (
          <li key={link.href} className="mb-3">
            <Link href={link.href} className="text-blue-600 hover:underline">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
