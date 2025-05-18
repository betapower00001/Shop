 //src/app/payments/credit-card/page.tsx


'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function CreditCardPage() {
  const router = useRouter()
  const orderId = useSearchParams().get('orderId')

  useEffect(() => {
    const simulatePayment = async () => {
      await new Promise((r) => setTimeout(r, 2000)) // mock delay
      const res = await fetch('/api/payments', {
        method: 'POST',
        body: (() => {
          const formData = new FormData()
          formData.append('orderId', orderId || '')
          formData.append('paymentMethod', 'credit_card')
          return formData
        })(),
      })

      if (res.ok) {
        alert('ชำระเงินสำเร็จ')
        router.push('/order')
      } else {
        alert('เกิดข้อผิดพลาดในการชำระเงิน')
      }
    }

    if (orderId) {
      simulatePayment()
    }
  }, [orderId, router])

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">กำลังดำเนินการชำระเงินผ่านบัตรเครดิต...</h1>
    </div>
  )
}
