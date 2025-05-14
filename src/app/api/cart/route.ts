import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// ประกาศ interface สำหรับข้อมูลที่ได้รับจาก request.json()
interface CartRequestBody {
  userId: number;
  productId: number;
  quantity: number;
}

export async function POST(request: Request) {
  const body = await request.json();
  const { userId, productId, quantity } = body as CartRequestBody;

  // Validate input
  if (!productId || !userId || !quantity) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const product = await prisma.product.findUnique({
    where: { id: productId },
  });

  if (!product) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }

  const totalAmount = quantity * product.price;

  // First, create the order without the order items
  const order = await prisma.order.create({
    data: {
      userId,
      totalAmount,
      status: 'pending',
    },
  });

  // Now, create the order item linking the product to the order
  const orderItem = await prisma.orderItem.create({
    data: {
      orderId: order.id,
      productId,
      quantity,
      totalAmount,
    },
  });

  // Return the created order along with the order item
  return NextResponse.json({ order, orderItem });
}
