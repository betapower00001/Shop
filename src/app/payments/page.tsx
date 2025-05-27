 //src/app/payments/page.tsx

'use client'

import { Suspense } from 'react'
import PaymentFormWrapper from './PaymentFormWrapper'

export const dynamic = 'force-dynamic'

export default function PaymentPage() {
  return (
    <Suspense fallback={<div>กำลังโหลด...</div>}>
      <PaymentFormWrapper />
    </Suspense>
  )
}
