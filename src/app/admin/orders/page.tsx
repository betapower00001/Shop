import { prisma } from '@/lib/prisma';

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    include: {
      user: true, // ข้อมูลผู้ใช้
      orderItems: {
        include: {
          product: true, // โหลดสินค้าภายในแต่ละ order item
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">คำสั่งซื้อทั้งหมด</h1>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Order ID</th>
            <th className="py-2 px-4 border-b">User</th>
            <th className="py-2 px-4 border-b">Products</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">วันที่สั่งซื้อ</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td className="py-2 px-4 border-b">{order.id}</td>
              <td className="py-2 px-4 border-b">{order.user.name}</td>
              <td className="py-2 px-4 border-b">
                <ul>
                  {order.orderItems.map((item) => (
                    <li key={item.id}>
                      {item.product.name} x {item.quantity}
                    </li>
                  ))}
                </ul>
              </td>
              <td className="py-2 px-4 border-b">{order.status}</td>
              <td className="py-2 px-4 border-b">
                {new Date(order.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
