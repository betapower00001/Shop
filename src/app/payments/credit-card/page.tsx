// src/app/payments/credit-card/page.tsx
'use client';

import { useSearchParams } from 'next/navigation';

export default function CreditCardClient() {
  const searchParams = useSearchParams();
  const paymentMethod = searchParams.get('method');

  return <div>Selected Method: {paymentMethod}</div>;
}
