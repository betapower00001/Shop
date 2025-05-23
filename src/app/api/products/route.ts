import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const products = await prisma.product.findMany()
    return NextResponse.json(products)
  } catch (err) {
    console.error('❌ Error fetching products:', err)
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, description, price, imageUrl, stock } = body

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        imageUrl,
        stock: parseInt(stock),
      },
    })

    return NextResponse.json(product)
  } catch (err) {
    console.error('❌ Error creating product:', err)
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 })
  }
}
