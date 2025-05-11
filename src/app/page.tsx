// app/page.tsx
import HomeClient from './HomeClient'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'บริการการตลาดออนไลน์ | shop',
  description: 'วางแผนการตลาดออนไลน์แบบมืออาชีพ ครบจบในที่เดียว พร้อมทีมงานดูแลธุรกิจของคุณ',
  openGraph: {
    title: 'shop DIGITAL | วางแผนการตลาดครบวงจร',
    description: 'ขยายธุรกิจของคุณด้วยกลยุทธ์การตลาดที่แม่นยำ',
    url: 'https://imn.co.th',
    images: [
      {
        url: '/img/Shop-logo.png',
        width: 800,
        height: 600,
        alt: 'og image',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function HomePage() {
  return <HomeClient />
}
