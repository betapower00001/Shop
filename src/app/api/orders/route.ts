// src/app/api/orders/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const { userId, cartItems } = await request.json();

  // คำนวณยอดรวมจากสินค้าทั้งหมดในตะกร้า
  const totalAmount = cartItems.reduce(
    (sum: number, item: any) => sum + item.price * item.quantity,
    0
  );

  // สร้างคำสั่งซื้อ (Order)
  const order = await prisma.order.create({
    data: {
      userId,
      totalAmount,
      status: "pending",
      orderItems: {
        // ใช้ชื่อ field ให้ตรงกับ schema
        create: cartItems.map((item: any) => ({
          productId: item.productId,
          quantity: item.quantity,
          totalAmount: item.quantity * item.price,
        })),
      },
    },
  });
  return NextResponse.json({ order });
}
