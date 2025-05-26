// src/app/admin/page.tsx
import { prisma } from '@/lib/prisma';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    return (
      <div className="text-center mt-20">
        <h1 className="text-2xl font-bold mb-4">403 - Forbidden</h1>
        <p>คุณไม่มีสิทธิ์เข้าถึงหน้านี้</p>
      </div>
    );
  }

  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">จัดการสินค้า</h1>
      {products.length === 0 ? (
        <p>ยังไม่มีสินค้า</p>
      ) : (
        <ul className="space-y-3">
          {products.map(product => (
            <li key={product.id} className="border p-3 rounded shadow-sm bg-white">
              <div className="font-semibold">{product.name}</div>
              <div>ราคา: ฿{product.price}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
