 //src/app/payments/page.tsx

import { Suspense } from 'react'
import PaymentClient from './PaymentClient'

export const dynamic = 'force-dynamic'

export default function PaymentPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentClient />
    </Suspense>
  )
}
