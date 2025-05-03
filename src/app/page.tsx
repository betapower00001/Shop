// app/page.tsx
import HomeClient from './HomeClient'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'บริการการตลาดออนไลน์ | INFINITY DIGITAL',
  description: 'วางแผนการตลาดออนไลน์แบบมืออาชีพ ครบจบในที่เดียว พร้อมทีมงานดูแลธุรกิจของคุณ',
  openGraph: {
    title: 'INFINITY DIGITAL | วางแผนการตลาดครบวงจร',
    description: 'ขยายธุรกิจของคุณด้วยกลยุทธ์การตลาดที่แม่นยำ',
    url: 'https://www.yourdomain.com',
    images: [
      {
        url: '/img/og-image.jpg',
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
