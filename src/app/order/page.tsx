 //src/app/order/products/page.tsx

import { getServerSession } from 'next-auth/next'; // ใช้การนำเข้าจาก 'next-auth/next'
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/authOptions';
import { redirect } from 'next/navigation';
import { Session } from 'next-auth';

export default async function OrderPage() {
  // ดึงข้อมูล session พร้อมกำหนดประเภทเป็น Session
  const session = await getServerSession(authOptions);

  // ตรวจสอบว่า session หรือ session.user เป็น null หรือ undefined
  if (!session || !session.user?.email) {
    return redirect('/login');
  }

  // ดึงข้อมูลผู้ใช้จากฐานข้อมูล
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  // หากไม่พบผู้ใช้
  if (!user) {
    return <div>ไม่พบผู้ใช้งาน</div>;
  }

  // ดึงข้อมูลคำสั่งซื้อทั้งหมดของผู้ใช้
  const orders = await prisma.order.findMany({
    where: { userId: user.id },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  // แสดงผลลัพธ์
  return (
    <div className="max-w-4xl mx-auto mt-8 px-4">
      <h1 className="text-2xl font-bold mb-6">ประวัติคำสั่งซื้อของคุณ</h1>

      {orders.length === 0 ? (
        <p>คุณยังไม่มีคำสั่งซื้อ</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="border p-4 rounded-lg shadow-sm">
              <h2 className="font-semibold text-lg mb-2">คำสั่งซื้อ #{order.id}</h2>
              <p className="text-sm mb-2">สถานะ: <strong>{order.status}</strong></p>
              <p className="text-sm mb-2">รวมทั้งหมด: ฿{order.totalAmount.toFixed(2)}</p>
              <p className="text-sm mb-4">วันที่สั่ง: {new Date(order.createdAt).toLocaleDateString()}</p>

              <div className="border-t pt-2">
                {order.orderItems.map((item) => (
                  <div key={item.id} className="flex justify-between py-2">
                    <span>{item.product.name} x {item.quantity}</span>
                    <span>฿{item.totalAmount.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
