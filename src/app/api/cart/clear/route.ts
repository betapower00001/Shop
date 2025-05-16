import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// POST /api/cart/clear
export async function POST() {
  try {
    await prisma.cartItem.deleteMany({
      where: { userId: 1 }, // ✅ กำหนด userId ที่จะล้าง
    });

    return NextResponse.json({ message: "Cart cleared" });
  } catch (error) {
    console.error("❌ ล้างตะกร้าล้มเหลว:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
