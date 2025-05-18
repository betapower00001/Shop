import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const orderIdStr = url.pathname.split('/').pop()
  const orderId = Number(orderIdStr)

  if (isNaN(orderId)) {
    return NextResponse.json({ error: 'orderId ไม่ถูกต้อง' }, { status: 400 })
  }

  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          address: true,
          phone: true,
        }
      },
      orderItems: {
        include: {
          product: true,
        },
      },
      payment: true,
    }
  })

  if (!order) {
    return NextResponse.json({ error: 'ไม่พบคำสั่งซื้อ' }, { status: 404 })
  }

  return NextResponse.json(order)
}
