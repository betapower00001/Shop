 //src/app/payments/PaymentForm.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

type Props = {
  orderId: string
}

export default function PaymentForm({ orderId: orderIdFromQuery }: Props) {
  const [paymentMethod, setPaymentMethod] = useState('promptpay')
  const [image, setImage] = useState<File | null>(null)
  const router = useRouter()

  const handleSubmit = async () => {
    if (!orderIdFromQuery) {
      alert('ไม่พบรหัสคำสั่งซื้อ')
      return
    }

    if ((paymentMethod === 'promptpay' || paymentMethod === 'bank_transfer') && !image) {
      alert('กรุณาแนบสลิปการโอน')
      return
    }

    const formData = new FormData()
    formData.append('orderId', orderIdFromQuery)
    formData.append('paymentMethod', paymentMethod)
    if (image) {
      formData.append('file', image)
    }

    const res = await fetch('/api/payments', {
      method: 'POST',
      body: formData,
    })

    if (res.ok) {
      alert('ส่งข้อมูลชำระเงินเรียบร้อย')
      router.push('/order')
    } else {
      const text = await res.text()
      alert('เกิดข้อผิดพลาด: ' + text)
    }
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">แจ้งชำระเงิน</h1>

      <div className="mb-4">
        <label>เลขที่คำสั่งซื้อ:</label>
        <input
          value={orderIdFromQuery}
          readOnly
          className="w-full border px-2 py-1 bg-gray-100 text-gray-600"
        />
      </div>

      <div className="mb-4">
        <label>วิธีชำระเงิน:</label>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="w-full border px-2 py-1"
        >
          <option value="promptpay">พร้อมเพย์</option>
          <option value="bank_transfer">โอนธนาคาร</option>
          <option value="cod">เก็บเงินปลายทาง</option>
        </select>
      </div>

      {(paymentMethod === 'promptpay' || paymentMethod === 'bank_transfer') && (
        <div className="mb-4">
          <label>แนบสลิปการโอน:</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
            className="w-full"
          />
        </div>
      )}

      <button
        onClick={handleSubmit}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        ส่งข้อมูลชำระเงิน
      </button>
    </div>
  )
}
