// src/app/admin/Order/page.tsx

'use client';

import { useEffect, useState } from 'react';

type Product = {
  id: number;
  name: string;
};

type OrderItem = {
  id: number;
  product: Product;
  quantity: number;
};

type User = {
  id: number;
  name: string | null;
};

type Order = {
  id: number;
  status: string;
  createdAt: string;
  user: User;
  orderItems: OrderItem[];
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await fetch('/api/orders');
      const data = await res.json();
      setOrders(data);
    };
    fetchOrders();
  }, []);

  async function handleStatusChange(orderId: number, newStatus: string) {
    const res = await fetch(`/api/orders/${orderId}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: newStatus }),
    });

    if (res.ok) {
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
      alert('อัปเดตสถานะเรียบร้อย');
    } else {
      alert('เกิดข้อผิดพลาดในการอัปเดตสถานะ');
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">คำสั่งซื้อทั้งหมด</h1>
      <table className="min-w-full bg-white border">
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
              <td className="py-2 px-4 border-b">{order.user?.name || '-'}</td>
              <td className="py-2 px-4 border-b">
                <ul>
                  {order.orderItems.map((item) => (
                    <li key={item.id}>
                      {item.product?.name || 'Unknown'} x {item.quantity}
                    </li>
                  ))}
                </ul>
              </td>
              <td className="py-2 px-4 border-b">
                <select
                  defaultValue={order.status}
                  onChange={(e) =>
                    handleStatusChange(order.id, e.target.value)
                  }
                  className="border px-2 py-1 rounded"
                >
                  <option value="pending">รอดำเนินการ</option>
                  <option value="processing">กำลังจัดเตรียม</option>
                  <option value="shipped">จัดส่งแล้ว</option>
                  <option value="completed">สำเร็จ</option>
                  <option value="cancelled">ยกเลิก</option>
                </select>
              </td>
              <td className="py-2 px-4 border-b">
                {new Date(order.createdAt).toLocaleDateString('th-TH', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
