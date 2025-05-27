 //src/app/payments/page.tsx

import { Suspense } from 'react'
import PaymentForm from './PaymentForm'

export const dynamic = 'force-dynamic' // บังคับ dynamic rendering

export default function PaymentPage() {
  return (
    <Suspense fallback={<div>กำลังโหลด...</div>}>
      <PaymentForm />
    </Suspense>
  )
}
