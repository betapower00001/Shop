// src/app/payments/credit-card/CreditCardClient.tsx

'use client' // ระบุว่าคอมโพเนนต์นี้เป็น Client Component

import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function CreditCardClient() {
  const router = useRouter()
  const searchParams = useSearchParams() // Hook สำหรับดึงค่าจาก URL query parameters
  const [orderId, setOrderId] = useState<string | null>(null)

  // useEffect สำหรับดึงค่า orderId จาก searchParams เมื่อคอมโพเนนต์ mount หรือ searchParams เปลี่ยน
  useEffect(() => {
    setOrderId(searchParams.get('orderId'))
  }, [searchParams])

  // useEffect สำหรับจำลองการชำระเงิน
  useEffect(() => {
    const simulatePayment = async () => {
      if (!orderId) return // ถ้าไม่มี orderId ก็ไม่ต้องดำเนินการต่อ

      // จำลองการรอ 2 วินาที เพื่อให้เหมือนกับการประมวลผลการชำระเงินจริง
      await new Promise((r) => setTimeout(r, 2000))

      // สร้าง FormData สำหรับส่งข้อมูลการชำระเงิน
      const formData = new FormData()
      formData.append('orderId', orderId)
      formData.append('paymentMethod', 'credit_card')

      // ส่งคำขอไปยัง API สำหรับการชำระเงิน
      const res = await fetch('/api/payments', {
        method: 'POST',
        body: formData,
      })

      // ตรวจสอบผลลัพธ์จากการชำระเงิน
      if (res.ok) {
        // alert('ชำระเงินสำเร็จ') // หลีกเลี่ยง alert()
        console.log('ชำระเงินสำเร็จ') // สำหรับการทดสอบ
        router.push('/order') // นำทางไปยังหน้าคำสั่งซื้อ
      } else {
        // alert('เกิดข้อผิดพลาดในการชำระเงิน') // หลีกเลี่ยง alert()
        console.error('เกิดข้อผิดพลาดในการชำระเงิน') // สำหรับการทดสอบ
      }
    }

    simulatePayment() // เรียกใช้ฟังก์ชันจำลองการชำระเงิน
  }, [orderId, router]) // ให้ useEffect ทำงานเมื่อ orderId หรือ router เปลี่ยน

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">กำลังดำเนินการชำระเงินผ่านบัตรเครดิต...</h1>
    </div>
  )
}
