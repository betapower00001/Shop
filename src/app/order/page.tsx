 //src/app/order/page.tsx

import { getServerSession } from 'next-auth/next';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/authOptions';
import { redirect } from 'next/navigation';

export default async function OrderPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return redirect('/login');
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return <div>ไม่พบผู้ใช้งาน</div>;
  }

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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-300 text-black';
      case 'paid':
        return 'bg-blue-300 text-black';
      case 'shipped':
        return 'bg-indigo-400 text-white';
      case 'completed':
        return 'bg-green-400 text-white';
      case 'cancelled':
        return 'bg-gray-400 text-white';
      default:
        return 'bg-gray-200 text-black';
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 px-4">
      <h1 className="text-2xl font-bold mb-6">ประวัติคำสั่งซื้อของคุณ</h1>

      {orders.length === 0 ? (
        <p>คุณยังไม่มีคำสั่งซื้อ</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="border p-4 rounded-lg shadow-sm bg-white">
              <div className="flex justify-between items-center">
                <h2 className="font-semibold text-lg">คำสั่งซื้อ #{order.id}</h2>
                <span className={`px-2 py-1 rounded text-sm font-medium ${getStatusBadge(order.status)}`}>
                  {order.status}
                </span>
              </div>
              <p className="text-sm">รวมทั้งหมด: ฿{order.totalAmount.toFixed(2)}</p>
              <p className="text-sm">วันที่สั่ง: {new Date(order.createdAt).toLocaleDateString()}</p>
              {order.trackingNumber && (
                <p className="text-sm text-blue-600">เลขพัสดุ: {order.trackingNumber}</p>
              )}

              <div className="border-t pt-2 mt-2">
                {order.orderItems.map((item) => (
                  <div key={item.id} className="flex justify-between py-2 text-sm">
                    <span>{item.product.name} × {item.quantity}</span>
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
