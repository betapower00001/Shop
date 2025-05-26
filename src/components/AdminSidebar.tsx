// src/components/AdminSidebar.tsx

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";



const adminLinks = [
  { href: "/admin/orders", label: "Orders", icon: "fas fa-receipt" },
  { href: "/admin", label: "Dashboard", icon: "fas fa-tachometer-alt" },
  { href: "/admin/products", label: "Products", icon: "fas fa-box" },
  { href: "/admin/users", label: "Users", icon: "fas fa-users" },
  { href: "/admin/analytics", label: "Analytics", icon: "fas fa-chart-line" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const renderLinks = () => (
    <ul className="space-y-2 mt-6">
      {adminLinks.map((link) => {
        const isActive = pathname === link.href;
        return (
          <li key={link.href}>
            <Link
              href={link.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-colors duration-200",
                isActive
                  ? "bg-blue-100 text-blue-700 font-semibold"
                  : "text-gray-700 hover:bg-gray-100"
              )}
              onClick={() => setMobileOpen(false)}
            >
              <div
                className={cn(
                  "w-8 h-8 flex items-center justify-center rounded-lg",
                  isActive
                    ? "bg-blue-200 text-blue-700"
                    : "bg-gray-100 text-gray-500"
                )}
              >
                <i className={link.icon} />
              </div>
              <span className="text-base">{link.label}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b px-4 py-3 flex items-center justify-between shadow">
        <h1 className="text-lg font-bold text-gray-800">Admin Panel</h1>
        <button onClick={() => setMobileOpen(true)}>
          <Bars3Icon className="w-6 h-6 text-gray-700" />
        </button>
      </div>

      {/* Mobile Drawer */}
      <Transition.Root show={mobileOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50 md:hidden"
          onClose={setMobileOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-30" />
          </Transition.Child>

          <div className="fixed inset-0 flex z-50">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-200 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-200 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="w-64 bg-white p-6 shadow-md">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold">Admin Menu</h2>
                  <button onClick={() => setMobileOpen(false)}>
                    <XMarkIcon className="h-6 w-6 text-gray-700" />
                  </button>
                </div>
                {renderLinks()}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Desktop Sidebar */}
      <aside className="hidden md:fixed md:inset-y-0 md:left-0 md:flex md:w-64 md:flex-col md:bg-white md:border-r md:py-8 md:px-6 md:shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-8">Admin Panel</h2>
        {renderLinks()}
      </aside>
    </>
  );
}
