// src/app/payments/credit-card/page.tsx

'use client' // 👈 บอกว่าไฟล์นี้เป็น Client Component

import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function CreditCardPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [orderId, setOrderId] = useState<string | null>(null)

  useEffect(() => {
    setOrderId(searchParams.get('orderId'))
  }, [searchParams])

  useEffect(() => {
    const simulatePayment = async () => {
      if (!orderId) return
      await new Promise((r) => setTimeout(r, 2000))

      const formData = new FormData()
      formData.append('orderId', orderId)
      formData.append('paymentMethod', 'credit_card')

      const res = await fetch('/api/payments', {
        method: 'POST',
        body: formData,
      })

      if (res.ok) {
        alert('ชำระเงินสำเร็จ')
        router.push('/order')
      } else {
        alert('เกิดข้อผิดพลาดในการชำระเงิน')
      }
    }

    simulatePayment()
  }, [orderId, router])

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">กำลังดำเนินการชำระเงินผ่านบัตรเครดิต...</h1>
    </div>
  )
}
