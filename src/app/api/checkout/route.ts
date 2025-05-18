// src/app/api/checkout/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const {
      userId,
      shippingName,
      shippingAddress,
      shippingPhone,
      totalAmount,
      paymentMethod,
      orderItems,
    } = await req.json()

    if (!userId || !shippingName || !shippingAddress || !shippingPhone || !paymentMethod) {
      return NextResponse.json({ error: 'ข้อมูลไม่ครบถ้วน' }, { status: 400 })
    }

    if (!orderItems || orderItems.length === 0) {
      return NextResponse.json({ error: 'ไม่มีสินค้าในคำสั่งซื้อ' }, { status: 400 })
    }

    // สร้าง Order (ไม่ต้องใส่ paymentMethod)
    const newOrder = await prisma.order.create({
      data: {
        userId,
        shippingName,
        shippingAddress,
        shippingPhone,
        totalAmount,
        status: 'pending',
        orderItems: {
          create: orderItems.map((item: any) => ({
            productId: item.productId,
            quantity: item.quantity,
            totalAmount: item.totalAmount,
          })),
        },
      },
    })

    // สร้าง Payment พร้อมระบุ paymentMethod
    await prisma.payment.create({
      data: {
        orderId: newOrder.id,
        amount: totalAmount,
        status: 'pending',
        paymentMethod,
         userId: userId,
      },
    })

    return NextResponse.json({ orderId: newOrder.id })
  } catch (error: any) {
    console.error(error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
