// src/app/api/orders/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  })

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  const { cartItems } = await request.json()

  const totalAmount = cartItems.reduce(
    (sum: number, item: any) => sum + item.price * item.quantity,
    0
  )

  const order = await prisma.order.create({
    data: {
      userId: user.id,
      totalAmount,
      status: 'pending',
      orderItems: {
        create: cartItems.map((item: any) => ({
          productId: item.productId,
          quantity: item.quantity,
          totalAmount: item.price * item.quantity,
        })),
      },
    },
  })

  return NextResponse.json({ order })
}
