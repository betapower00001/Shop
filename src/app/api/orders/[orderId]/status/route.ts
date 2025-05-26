// src/app/api/orders/[orderId]/status/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PATCH(request: NextRequest) {
  // ✅ ดึง orderId จาก URL
  const url = new URL(request.url)
  const segments = url.pathname.split('/') // ตัวอย่าง: ["", "api", "orders", "123", "status"]
  const orderIdStr = segments[3]
  const orderId = parseInt(orderIdStr || '', 10)

  if (isNaN(orderId)) {
    return NextResponse.json({ error: 'Invalid order ID' }, { status: 400 })
  }

  const body: { status: string } = await request.json()
  const { status } = body

  const validStatuses = ['pending', 'processing', 'shipped', 'completed', 'cancelled']
  if (!validStatuses.includes(status)) {
    return NextResponse.json({ error: 'Invalid status' }, { status: 400 })
  }

  try {
    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: { status },
    })

    return NextResponse.json(updatedOrder)
  } catch (error) {
    console.error('Update failed:', error)
    return NextResponse.json(
      { error: 'ไม่สามารถอัปเดตสถานะคำสั่งซื้อได้' },
      { status: 500 }
    )
  }
}
