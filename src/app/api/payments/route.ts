import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  const { userId, orderId, paymentMethod } = await request.json();

  const order = await prisma.order.findUnique({
    where: { id: orderId },
  });

  if (!order) {
    return NextResponse.json({ error: 'Order not found' }, { status: 404 });
  }

  const totalAmount = order.totalAmount;

  const payment = await prisma.payment.create({
    data: {
      userId,                // ✅ ใช้ได้แล้ว
      orderId,
      paymentMethod,         // ✅ ใช้ได้แล้ว
      amount: totalAmount,   // ✅ ต้องมี
      method: paymentMethod, // ✅ ใช้ซ้ำสำหรับ field 'method'
      status: 'completed',
    },
  });

  const updatedOrder = await prisma.order.update({
    where: { id: orderId },
    data: { status: 'paid' },
  });

  return NextResponse.json({ payment, updatedOrder });
}
