import dynamic from 'next/dynamic'

const HomeClient = dynamic(() => import('./HomeClient'))

export default function HomePage() {
  return <HomeClient />
}