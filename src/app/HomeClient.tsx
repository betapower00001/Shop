'use client'

import { useState, useEffect } from 'react'
import BounceLoader from 'react-spinners/SyncLoader'
import HeaderNavbar from '@/components/Menu/indexnavbar'
import Footer from '@/components/Footer'
import LogoPic from '@/components/Img/Shop-logo.png'


export default function HomeClient() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const img = new Image()
    img.src = LogoPic.src
    img.onload = () => setTimeout(() => setLoading(false), 300)
  }, [])

  return (
    <>
      {loading && (
        <div className="loading-overlay">
          <img src={LogoPic.src} width="200" alt="Loading Logo" />
          <BounceLoader color="white" loading={loading} size={12.5} />
        </div>
      )}

      {!loading && (
        <>
          <HeaderNavbar />
          <main>
            ffsfs
            <Footer />
          </main>
        </>
      )}
    </>
  )
}
