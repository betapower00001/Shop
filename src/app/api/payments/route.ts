// src/app/api/payments/route.ts

import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import path from 'path'

export async function POST(req: Request) {
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

  const formData = await req.formData()
  const orderId = formData.get('orderId') as string
  const paymentMethod = formData.get('paymentMethod') as string
  const file = formData.get('file') as File

  let proofImageUrl = ''
  if (file) {
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const filename = `${Date.now()}-${file.name}`
    const filePath = path.join(process.cwd(), 'public', 'uploads', filename)

    await writeFile(filePath, buffer)
    proofImageUrl = `/uploads/${filename}`
  }

  const order = await prisma.order.findUnique({
    where: { id: parseInt(orderId), userId: user.id },
  })

  if (!order) {
    return NextResponse.json({ error: 'Order not found' }, { status: 404 })
  }

  await prisma.payment.create({
    data: {
      userId: user.id,
      orderId: order.id,
      amount: order.totalAmount,
      paymentMethod,
      proofImageUrl,
      status: 'completed',
    },
  })

  await prisma.order.update({
    where: { id: order.id },
    data: { status: 'paid' },
  })

  return NextResponse.json({ success: true })
}

