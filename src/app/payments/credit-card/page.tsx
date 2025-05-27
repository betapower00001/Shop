// src/app/payments/credit-card/page.tsx

// นำเข้า CreditCardClient โดยตรง
// เนื่องจาก CreditCardClient มี 'use client' อยู่แล้ว
// Next.js จะรู้ว่าหน้านี้ต้องถูก Client-side Render
import CreditCardClient from './CreditCardClient'; 

export default function CreditCardPage() {
  return (
    // เรียกใช้ CreditCardClient โดยตรง
    // คอมโพเนนต์ CreditCardClient จะถูกโหลดและทำงานบนฝั่ง Client
    <CreditCardClient />
  );
}
