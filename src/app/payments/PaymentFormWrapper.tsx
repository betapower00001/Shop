//src/app/payments/PaymentFormWrapper.tsx
'use client'

import { useSearchParams } from 'next/navigation'
import PaymentForm from './PaymentForm'

export default function PaymentFormWrapper() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('orderId') || ''

  return <PaymentForm orderId={orderId} />
}
