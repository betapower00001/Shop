// src/app/admin/page.tsx
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  // ตรวจสอบสิทธิ์ admin
  if (!session || session.user.role !== "admin") {
    redirect("/403"); // ✅ redirect ไปหน้า 403 โดยตรง
  }

  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">จัดการสินค้า</h1>

      {products.length === 0 ? (
        <p className="text-gray-500">ยังไม่มีสินค้า</p>
      ) : (
        <ul className="space-y-4">
          {products.map((product) => (
            <li
              key={product.id}
              className="border p-4 rounded-lg shadow bg-white"
            >
              <div className="font-semibold">{product.name}</div>
              <div>ราคา: ฿{product.price}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
