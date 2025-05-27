'use client';

import { useSearchParams } from 'next/navigation';

export default function PaymentsClient() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  return <div>Payment ID: {id}</div>;
}
