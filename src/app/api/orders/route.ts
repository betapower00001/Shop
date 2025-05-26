// src/app/api/orders/route.ts

import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'

interface CartItem {
  productId: number
  quantity: number
  price: number
}

interface OrderRequest {
  cartItems: CartItem[]
}

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      include: {
        user: true,
        orderItems: {
          include: {
            product: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(orders)
  } catch (error) {
    console.error('โหลด orders ผิดพลาด:', error)
    return NextResponse.json({ error: 'โหลด orders ผิดพลาด' }, { status: 500 })
  }
}

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

  const body: OrderRequest = await request.json()
  const cartItems: CartItem[] = body.cartItems

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  const order = await prisma.order.create({
    data: {
      userId: user.id,
      totalAmount,
      status: 'pending',
      orderItems: {
        create: cartItems.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          totalAmount: item.price * item.quantity,
        })),
      },
    },
  })

  return NextResponse.json({ order })
}
