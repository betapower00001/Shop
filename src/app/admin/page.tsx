// src/app/admin/page.tsx
import { prisma } from '@/lib/prisma';

export default async function AdminPage() {
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
