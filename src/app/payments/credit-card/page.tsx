// src/app/payments/credit-card/page.tsx

import dynamic from 'next/dynamic';
import { Suspense } from 'react'; // 👈 นำเข้า Suspense จาก React

// Dynamic import ของ CreditCardClient โดยปิดการ render ฝั่ง server
const CreditCardClient = dynamic(() => import('./CreditCardClient'), {
  ssr: false, // ปิดการ render ฝั่ง server สำหรับคอมโพเนนต์นี้
  loading: () => <p>กำลังโหลดหน้าชำระเงิน...</p>, // แสดงข้อความ Loading ในขณะที่คอมโพเนนต์กำลังโหลด
});

export default function CreditCardPage() {
  return (
    // ห่อ CreditCardClient ด้วย Suspense เพื่อจัดการกับการโหลดบนฝั่ง Client
    // fallback จะแสดงขึ้นมาในระหว่างที่ CreditCardClient กำลังโหลด
    <Suspense fallback={<div>กำลังเตรียมหน้าชำระเงิน...</div>}>
      <CreditCardClient />
    </Suspense>
  );
}
