 //src/app/payments/page.tsx


import dynamic from 'next/dynamic';

const PaymentsClient = dynamic(() => import('./PaymentClient'), { ssr: false });

export default function PaymentsPage() {
  return <PaymentsClient />;
}
