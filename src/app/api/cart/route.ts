// src/app/api/cart/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  const { userId, productId, quantity } = await request.json();

  // ตรวจสอบว่า productId มีค่าหรือไม่
  if (!productId) {
    return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
  }

  const product = await prisma.product.findUnique({
    where: { id: productId },
  });

  // ตรวจสอบว่าผลลัพธ์ที่ได้จากฐานข้อมูลมีสินค้าอยู่จริง
  if (!product) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }

  // คำนวณยอดรวม
  const totalAmount = quantity * product.price;

  // เพิ่มสินค้าในตะกร้า
  const cartItem = await prisma.order.create({
    data: {
      userId,
      productId,
      quantity,
      totalAmount,
      status: 'pending',
    },
  });

  return NextResponse.json(cartItem);
}
