// src/app/payments/credit-card/page.tsx

export const dynamicMode = 'force-dynamic' // เปลี่ยนชื่อไม่ชนกับ import

import dynamic from 'next/dynamic'

const CreditCardClient = dynamic(() => import('./CreditCardClient'), {
  ssr: false,
})

export default function CreditCardPage() {
  return <CreditCardClient />
}
