// src/app/api/products/[id]/route.ts

import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

interface Params {
  params: { id: string }
}

// ✅ GET: ดึงสินค้าตาม ID
export async function GET(_req: Request, { params }: Params) {
  try {
    const id = parseInt(params.id)

    const product = await prisma.product.findUnique({
      where: { id },
    })

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    return NextResponse.json(product)
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 })
  }
}

// ✅ PUT: อัปเดตสินค้า
export async function PUT(req: Request, { params }: Params) {
  try {
    const id = parseInt(params.id)
    const body = await req.json()
    const { name, description, price, imageUrl, stock } = body

    const updated = await prisma.product.update({
      where: { id },
      data: {
        name,
        description,
        price: parseFloat(price),
        imageUrl,
        stock: parseInt(stock),
      },
    })

    return NextResponse.json(updated)
  } catch (err) {
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 })
  }
}

// ✅ DELETE: ลบสินค้า
export async function DELETE(_req: Request, { params }: Params) {
  try {
    const id = parseInt(params.id)
    await prisma.product.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 })
  }
}
