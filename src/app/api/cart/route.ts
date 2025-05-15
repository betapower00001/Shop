// src/app/api/cart/route.ts

import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

interface CartRequestBody {
  userId: number;
  productId?: number;
  quantity?: number;
  cartItemId?: number;
}

// GET - ดึงข้อมูลตะกร้าของ userId จาก query param (default = 1)
export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const userIdParam = url.searchParams.get("userId");
  const userId = userIdParam ? parseInt(userIdParam) : 1;

  const cartItems = await prisma.cartItem.findMany({
    where: { userId },
    include: { product: true },
  });

  const result = cartItems.map(item => ({
    id: item.id,
    productId: item.productId,
    name: item.product.name,
    price: item.product.price,
    quantity: item.quantity,
  }));

  return NextResponse.json(result);
}

// POST - เพิ่มสินค้าลงตะกร้า หรือเพิ่มจำนวนถ้ามีอยู่แล้ว
export async function POST(request: Request) {
  try {
    const { userId, productId, quantity } = (await request.json()) as CartRequestBody;

    if (!userId || !productId || !quantity) {
      return NextResponse.json({ error: "ข้อมูลไม่ครบ" }, { status: 400 });
    }

    // ใช้ upsert กับ composite key userId + productId
    await prisma.cartItem.upsert({
      where: {
        userId_productId: {
          userId,
          productId,
        },
      },
      update: {
        quantity: {
          increment: quantity,
        },
      },
      create: {
        userId,
        productId,
        quantity,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("POST /api/cart error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// PUT - อัปเดตจำนวนสินค้าในตะกร้า
export async function PUT(request: Request) {
  try {
    const { cartItemId, quantity } = (await request.json()) as CartRequestBody;

    if (!cartItemId || !quantity || quantity < 1) {
      return NextResponse.json({ error: "ข้อมูลไม่ครบหรือจำนวนไม่ถูกต้อง" }, { status: 400 });
    }

    const updated = await prisma.cartItem.update({
      where: { id: cartItemId },
      data: { quantity },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("PUT /api/cart error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// DELETE - ลบสินค้าออกจากตะกร้า (รับ cartItemId จาก query param)
export async function DELETE(request: NextRequest) {
  const url = new URL(request.url);
  const cartItemIdParam = url.searchParams.get("cartItemId");

  if (!cartItemIdParam) {
    return NextResponse.json({ error: "ข้อมูลไม่ครบ" }, { status: 400 });
  }

  const cartItemId = parseInt(cartItemIdParam);

  try {
    await prisma.cartItem.delete({
      where: { id: cartItemId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/cart error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
