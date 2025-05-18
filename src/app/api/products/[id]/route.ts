// src/app/api/products/[id]/route.ts

import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// ฟังก์ชันช่วยแปลง id
function parseId(idParam: string): number | null {
  const id = parseInt(idParam, 10)
  return isNaN(id) ? null : id
}

// GET: ดึงสินค้าตาม ID
export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params
    const idParam = resolvedParams.id

    const id = parseId(idParam)
    if (id === null) {
      return NextResponse.json({ error: 'Invalid id parameter' }, { status: 400 })
    }

    const product = await prisma.product.findUnique({ where: { id } })

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    return NextResponse.json(product)
  } catch (err) {
    console.error('❌ GET Error:', err)
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 })
  }
}

// PUT: อัปเดตสินค้า
export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params
    const idParam = resolvedParams.id

    const id = parseId(idParam)
    if (id === null) {
      return NextResponse.json({ error: 'Invalid id parameter' }, { status: 400 })
    }

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
    console.error('❌ PUT Error:', err)
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 })
  }
}

// DELETE: ลบสินค้า
export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params
    const idParam = resolvedParams.id

    const id = parseId(idParam)
    if (id === null) {
      return NextResponse.json({ error: 'Invalid id parameter' }, { status: 400 })
    }

    await prisma.product.delete({ where: { id } })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('❌ DELETE Error:', err)
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 })
  }
}
