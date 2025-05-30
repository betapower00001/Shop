// src/app/admin/page.tsx

import { prisma } from '@/lib/prisma';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";

export default async function AdminPage() {
  // ดึง session จาก next-auth (server side)
  const session = await getServerSession(authOptions);

  // ถ้าไม่ล็อกอิน หรือไม่ใช่ admin ให้แสดงหน้า Forbidden
  if (!session || session.user.role !== "admin") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
        <h1 className="text-3xl font-extrabold mb-4">403 - Forbidden</h1>
        <p className="text-lg text-gray-600">คุณไม่มีสิทธิ์เข้าถึงหน้านี้</p>
      </div>
    );
  }

  // ดึงข้อมูลสินค้าจากฐานข้อมูล
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">จัดการสินค้า</h1>

      {products.length === 0 ? (
        <p className="text-gray-600">ยังไม่มีสินค้า</p>
      ) : (
        <ul className="space-y-4">
          {products.map(product => (
            <li
              key={product.id}
              className="border rounded-md p-4 shadow-sm bg-white hover:shadow-md transition"
            >
              <div className="font-semibold text-lg">{product.name}</div>
              <div className="text-gray-700 mt-1">ราคา: ฿{product.price.toLocaleString()}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
