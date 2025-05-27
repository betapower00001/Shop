// src/app/payments/credit-card/page.tsx

import dynamic from 'next/dynamic';
import { Suspense } from 'react'; // 👈 สำคัญ: นำเข้า Suspense จาก React

// Dynamic import ของ CreditCardClient
// ssr: false จะป้องกันไม่ให้ CreditCardClient ถูก render บน Server
// loading: จะแสดง fallback ในขณะที่ CreditCardClient กำลังโหลดบน Client
const CreditCardClient = dynamic(() => import('./CreditCardClient'), {
  ssr: false, // ปิดการ render ฝั่ง server สำหรับคอมโพเนนต์นี้
  loading: () => <p>กำลังโหลดหน้าชำระเงิน...</p>, // แสดงข้อความ Loading ในขณะที่คอมโพเนนต์กำลังโหลด
});

export default function CreditCardPage() {
  return (
    // 👈 สำคัญ: ห่อ CreditCardClient ด้วย Suspense
    // Suspense จะช่วยจัดการการโหลดของ Client Component ที่ใช้ Client-side Hooks
    // โดยจะแสดง fallback ในระหว่างที่คอมโพเนนต์จริงกำลังโหลด/Hydrate บน Client
    <Suspense fallback={<div>กำลังเตรียมหน้าชำระเงิน...</div>}>
      <CreditCardClient />
    </Suspense>
  );
}
