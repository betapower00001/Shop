'use client'

import { useCart } from '@/hooks/useCart'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart()
  const [paymentMethod, setPaymentMethod] = useState('credit_card')
  const router = useRouter()

  const handleCheckout = async () => {
    try {
      const userId = 1 // 👈 ตัวอย่าง (ในระบบจริงควรดึงจาก session)
      
      // 1. สร้างคำสั่งซื้อ
      const orderRes = await fetch('/api/orders', {
        method: 'POST',
        body: JSON.stringify({ userId, cartItems: items }),
      })
      const orderData = await orderRes.json()

      // 2. ชำระเงิน
      const paymentRes = await fetch('/api/payments', {
        method: 'POST',
        body: JSON.stringify({
          userId,
          orderId: orderData.order.id,
          paymentMethod,
        }),
      })

      if (paymentRes.ok) {
        clearCart()
        router.push('/order') // ไปหน้ารายการคำสั่งซื้อ
      } else {
        alert('เกิดข้อผิดพลาดในการชำระเงิน')
      }
    } catch (error) {
      console.error(error)
      alert('เกิดข้อผิดพลาดขณะทำรายการ')
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">ชำระเงิน</h1>
      {items.map((item) => (
        <div key={item.id} className="flex justify-between mb-2">
          <p>{item.name} x {item.quantity}</p>
          <p>{item.price * item.quantity} บาท</p>
        </div>
      ))}
      <p className="mt-4 text-lg font-semibold">รวม: {totalPrice} บาท</p>

      <div className="mt-4">
        <label>วิธีชำระเงิน:</label>
        <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} className="border px-2 py-1">
          <option value="credit_card">บัตรเครดิต</option>
          <option value="paypal">PayPal</option>
          <option value="cod">เก็บเงินปลายทาง</option>
        </select>
      </div>

      <button onClick={handleCheckout} className="mt-6 bg-green-600 text-white px-4 py-2 rounded">
        ยืนยันการสั่งซื้อ
      </button>
    </div>
  )
}
