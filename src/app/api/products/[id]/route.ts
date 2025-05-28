// src/app/api/products/[id]/route.ts

import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params
    const id = parseInt(resolvedParams.id, 10)
    if (isNaN(id)) {
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

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params
    const id = parseInt(resolvedParams.id, 10)
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid id parameter' }, { status: 400 })
    }

    const body = await req.json()
    const { name, description, price, imageUrl, stock, isActive } = body

    const dataToUpdate: any = {}

    if (name !== undefined) dataToUpdate.name = name
    if (description !== undefined) dataToUpdate.description = description
    if (price !== undefined) dataToUpdate.price = parseFloat(price)
    if (imageUrl !== undefined) dataToUpdate.imageUrl = imageUrl
    if (stock !== undefined) dataToUpdate.stock = parseInt(stock)
    if (isActive !== undefined) dataToUpdate.isActive = isActive

    const updated = await prisma.product.update({
      where: { id },
      data: dataToUpdate,
    })

    return NextResponse.json(updated)
  } catch (err) {
    console.error('❌ PATCH Error:', err)
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 })
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params
    const id = parseInt(resolvedParams.id, 10)
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid id parameter' }, { status: 400 })
    }

    await prisma.product.delete({ where: { id } })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('❌ DELETE Error:', err)
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 })
  }
}
