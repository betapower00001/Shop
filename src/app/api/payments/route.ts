// src/app/api/payments/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  const { userId, orderId, paymentMethod } = await request.json();

  // จัดการการชำระเงิน
  const payment = await prisma.payment.create({
    data: {
      userId,
      orderId,
      paymentMethod,
      status: 'completed', // หรือ 'pending', 'failed' ขึ้นอยู่กับการชำระเงิน
    },
  });

  // อัปเดตสถานะการสั่งซื้อ
  const updatedOrder = await prisma.order.update({
    where: { id: orderId },
    data: { status: 'paid' },
  });

  return NextResponse.json({ payment, updatedOrder });
}
