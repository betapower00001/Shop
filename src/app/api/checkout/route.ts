// src/app/api/checkout/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

interface OrderItem {
  productId: number
  quantity: number
  totalAmount: number
}

interface CheckoutRequest {
  userId: string
  shippingName: string
  shippingAddress: string
  shippingPhone: string
  totalAmount: number
  paymentMethod: string
  orderItems: OrderItem[]
}

export async function POST(req: NextRequest) {
  try {
    const body: CheckoutRequest = await req.json()

    const {
      userId,
      shippingName,
      shippingAddress,
      shippingPhone,
      totalAmount,
      paymentMethod,
      orderItems,
    } = body

    const userIdInt = parseInt(userId, 10)

    if (isNaN(userIdInt)) {
      return NextResponse.json({ error: 'userId ต้องเป็นตัวเลข' }, { status: 400 })
    }

    if (!userId || !shippingName || !shippingAddress || !shippingPhone || !paymentMethod) {
      return NextResponse.json({ error: 'ข้อมูลไม่ครบถ้วน' }, { status: 400 })
    }

    if (!orderItems || orderItems.length === 0) {
      return NextResponse.json({ error: 'ไม่มีสินค้าในคำสั่งซื้อ' }, { status: 400 })
    }

    const productIds = orderItems.map((item) => item.productId)
    const existingProducts = await prisma.product.findMany({
      where: { id: { in: productIds } },
      select: { id: true },
    })
    const existingProductIds = existingProducts.map((p) => p.id)

    const invalidProductId = productIds.find((id) => !existingProductIds.includes(id))
    if (invalidProductId) {
      return NextResponse.json(
        { error: `สินค้า id ${invalidProductId} ไม่มีในระบบ` },
        { status: 400 }
      )
    }

    const newOrder = await prisma.order.create({
      data: {
        userId: userIdInt,
        shippingName,
        shippingAddress,
        shippingPhone,
        totalAmount,
        status: 'pending',
        orderItems: {
          create: orderItems.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            totalAmount: item.totalAmount,
          })),
        },
      },
    })

    await prisma.payment.create({
      data: {
        orderId: newOrder.id,
        amount: totalAmount,
        status: 'pending',
        paymentMethod,
        userId: userIdInt,
      },
    })

    return NextResponse.json({ orderId: newOrder.id })
  } catch (error: unknown) {
    console.error(error)
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    return NextResponse.json({ error: 'เกิดข้อผิดพลาดไม่ทราบสาเหตุ' }, { status: 500 })
  }
}
