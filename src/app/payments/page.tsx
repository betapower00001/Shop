 //src/app/payments/page.tsx

import dynamic from 'next/dynamic';

const PaymentsClient = dynamic(() => import('./PaymentClient'), { 
  ssr: false,
  loading: () => <p>Loading payments...</p>,
});

export default function PaymentsPage() {
  return <PaymentsClient />;
}
