"use client";

import { useState, useEffect } from 'react';
import BounceLoader from "react-spinners/DotLoader";
import HeaderNavbar from '@/components/Menu/indexnavbar';
import Hero from '@/components/Hero';
import IconMarket from '@/components/IconMarket';
import Content1 from '@/components/Content';
import MarketingServices from '@/components/MarketingServices';
import Content3 from '@/components/Content3';
import Content4 from '@/components/Content4';
import STPMarketing from '@/components/STPMarketing';
import DigitalTouchpoint from '@/components/DigitalTouchpoint';
import BlogSection from '@/components/BlogSection';
import Review from '@/components/Review';
import Newletter from '@/components/Newsletter';
import Footer from '@/components/Footer';

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const img = new Image();
    img.src = "/img/logo-infinity.png";
    img.onload = () => setTimeout(() => setLoading(false), 300);
  }, []);

  return (
    <>
      {loading && (
        <div className="loading-overlay">
          <img src="/img/logo-infinity.png" width="200" alt="Loading Logo" />
          <BounceLoader color="white" loading={loading} size={40} />
        </div>
      )}
      {!loading && (
        <>
          <HeaderNavbar />
          <main>
            <Hero />
            <IconMarket />
            <Content1 />
            <MarketingServices />
            <Content3 />
            <Content4 />
            <STPMarketing />
            <DigitalTouchpoint />
            <BlogSection />
            <Review />
            <Newletter />
            <Footer />
          </main>
        </>
      )}
    </>
  );
}
