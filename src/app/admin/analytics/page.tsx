// src/app/admin/analytics/page.tsx
import { prisma } from '@/lib/prisma';

export default async function AdminAnalyticsPage() {
  const totalUsers = await prisma.user.count();
  const totalOrders = await prisma.order.count();
  const totalProducts = await prisma.product.count();

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Analytics</h1>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-4 shadow rounded">
          <h2 className="text-lg font-semibold">ผู้ใช้งานทั้งหมด</h2>
          <p className="text-2xl">{totalUsers}</p>
        </div>
        <div className="bg-white p-4 shadow rounded">
          <h2 className="text-lg font-semibold">คำสั่งซื้อทั้งหมด</h2>
          <p className="text-2xl">{totalOrders}</p>
        </div>
        <div className="bg-white p-4 shadow rounded">
          <h2 className="text-lg font-semibold">สินค้าทั้งหมด</h2>
          <p className="text-2xl">{totalProducts}</p>
        </div>
      </div>
    </div>
  );
}
