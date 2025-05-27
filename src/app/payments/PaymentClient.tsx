//app/payments/PaymentClient.tsx

'use client';

import { useSearchParams } from 'next/navigation';
import PaymentForm from './PaymentForm';

export default function PaymentsClient() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id') ?? ''; // fallback กัน crash

  return <PaymentForm orderId={id} />;
}
