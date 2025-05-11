'use client'

import { useCart } from '@/hooks/useCart'
import Image from 'next/image'
import Link from 'next/link'

export default function CartPage() {
  const { items, totalPrice, updateQuantity, removeFromCart } = useCart()

  if (items.length === 0) {
    return (
      <div className="p-4 text-center">
        <p>ตะกร้าสินค้าของคุณว่างเปล่า</p>
        <Link href="/product" className="text-blue-500 underline">ไปเลือกซื้อสินค้า</Link>
      </div>
    )
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">ตะกร้าสินค้า</h1>
      {items.map((item) => (
        <div key={item.id} className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <Image src={item.image || '/default-product.jpg'} alt={item.name} width={64} height={64} />
            <div>
              <h2>{item.name}</h2>
              <p className="text-sm text-gray-600">{item.price} บาท</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min={1}
              value={item.quantity}
              onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
              className="w-16 border px-2 py-1"
            />
            <button onClick={() => removeFromCart(item.id)} className="text-red-500">ลบ</button>
          </div>
        </div>
      ))}
      <div className="mt-6 text-right">
        <p className="text-lg font-semibold">รวมทั้งสิ้น: {totalPrice} บาท</p>
        <Link href="/checkout" className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded">ไปชำระเงิน</Link>
      </div>
    </div>
  )
}
