'use client'

import { useSearchParams } from 'next/navigation'
import PaymentForm from './PaymentForm'

export default function PaymentClient() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('orderId') || ''

  return <PaymentForm orderId={orderId} />
}
