// src/app/admin/layout.tsx
"use client";

import { ReactNode } from "react";
import AdminSidebar from "@/components/AdminSidebar";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 pt-[60px] md:pt-0 md:pl-64">
      {/* Sidebar and mobile topbar handled inside AdminSidebar */}
      <AdminSidebar />

      <main className="pt-[60px] md:pt-0 md:pl-64 p-4">{children}</main>
    </div>
  );
}
