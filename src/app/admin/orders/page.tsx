// src/app/admin/Order/page.tsx
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

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
  createdAt: Date;
  user: User;
  orderItems: OrderItem[];
};

export default async function AdminOrdersPage() {
  const session = await getServerSession(authOptions);

  // 🔒 ตรวจสอบสิทธิ์ admin
  if (!session || session.user.role !== "admin") {
    redirect("/403"); // ถ้าไม่ใช่ admin ให้ redirect
  }

  const orders: Order[] = await prisma.order.findMany({
    include: {
      user: true,
      orderItems: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
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
              <td className="py-2 px-4 border-b">{order.user?.name || "-"}</td>
              <td className="py-2 px-4 border-b">
                <ul>
                  {order.orderItems.map((item) => (
                    <li key={item.id}>
                      {item.product?.name || "Unknown"} x {item.quantity}
                    </li>
                  ))}
                </ul>
              </td>
              <td className="py-2 px-4 border-b">{order.status}</td>
              <td className="py-2 px-4 border-b">
                {new Date(order.createdAt).toLocaleDateString("th-TH", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
