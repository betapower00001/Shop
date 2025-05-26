// src/app/page.tsx

import { prisma } from "@/lib/prisma";
import ProductCarousel from "@/components/ProductCarousel";
import Banner2 from "@/components/Img/banner-2.jpg";
import Image from "next/image";
import T1 from "@/components/Img/T-1.jpg";
import T2 from "@/components/Img/T-2.jpg";
import T3 from "@/components/Img/T-3.jpg";
import Typ1 from "@/components/Img/Tye-1.png";
import Typ2 from "@/components/Img/Tye-2.png";
import Typ3 from "@/components/Img/Tye-3.png";
import Typ4 from "@/components/Img/Tye-4.png";

import Ex1 from "@/components/Img/banner-1-1.png";
import { BadgeCheck, ShieldCheck, Truck, Star } from "lucide-react";


export default async function HomePage() {
  const products = await prisma.product.findMany({
    take: 6,
    orderBy: { createdAt: "desc" },
  });

  const items = [
    {
      title: "ผ้า Silver PVC",
      subtitle: "เคลือบขุย สีบรอนด์เทา",
      image: T1,
      details: [
        "กันฝน กันฝุ่น",
        "สะท้อนยูวี กันมูลนก",
        "กันยางไม้ กันไอเค็มทะเล",
      ],
    },
    {
      title: "ผ้า พลาสติกใส",
      subtitle: "HDPE เกรด A แท้",
      image: T2,
      details: [
        "ความหนา 0.4",
        "กันฝน กันฝุ่น กันละอองน้ำ",
        "สะอองสี สะท้อนยูวี",
        "กันมูลนก กันยางไม้",
        "กันไอเค็มทะเล",
      ],
    },
    {
      title: "ผ้า 2in1 เคลือบขุย 2 สี",
      subtitle: "คลุมได้ 2 ด้าน 2 สี หนากว่าผ้าทั่วไป",
      image: T3,
      details: [
        "ความหนา 0.4",
        "กันฝน กันฝุ่น กันละอองน้ำ",
        "สะอองสี สะท้อนยูวี",
        "กันมูลนก กันยางไม้",
        "กันไอเค็มทะเล",
      ],
    },
  ];

  const features = [
    {
      icon: <BadgeCheck className="w-10 h-10 text-white mb-4" />,
      title: "สินค้าคุณภาพ",
      description:
        "เราคัดสรรวัสดุและการผลิตที่ได้มาตรฐาน เพื่อความพึงพอใจสูงสุดของคุณ",
    },
    {
      icon: <ShieldCheck className="w-10 h-10 text-white mb-4" />,
      title: "รับประกันความพึงพอใจ",
      description: "เปลี่ยนคืนได้ภายใน 7 วันหากไม่พอใจในคุณภาพหรือบริการ",
    },
    {
      icon: <Truck className="w-10 h-10 text-white mb-4" />,
      title: "จัดส่งรวดเร็ว",
      description: "บริการจัดส่งทั่วประเทศ ภายใน 1-3 วันทำการ",
    },
    {
      icon: <Star className="w-10 h-10 text-white mb-4" />,
      title: "รีวิวระดับ 5 ดาว",
      description: "ลูกค้ากว่า 98% พึงพอใจกับคุณภาพและบริการของเรา",
    },
  ];

  return (
    <main className="min-h-screen bg-background">
      {/* Full-viewport Banner */}
      <div
        className="relative w-full min-h-screen bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${Banner2.src})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center px-4">
          <div className="text-center text-white space-y-6 max-w-3xl -translate-y-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold drop-shadow-xl animate-fadeIn">
              เลือกสิ่งที่ดีที่สุดเพื่อรถของคุณ
            </h1>
            <h2 className="text-3xl sm:text-4xl font-semibold text-[#b90002]">
              P.A.C. PROTRADE
            </h2>
            <p className="text-lg sm:text-xl text-white/90 leading-relaxed">
              ผลิตและจำหน่ายผ้าคลุมรถยนต์เจ้าแรกในประเทศไทย <br />
              สุดยอดนวัตกรรมผ้าคลุมรถ ไม่มีรอยต่อทั้งผืน กันน้ำ 100% <br />
              ปกป้องรถของคุณจากน้ำ ฝุ่น และแสงแดดได้อย่างมีประสิทธิภาพ
            </p>
          </div>
        </div>
      </div>

      {/* Section: การ์ดแนะนำ */}
      <section className="w-full py-12 px-4 ">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 ">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-red-800 rounded-2xl shadow-md p-6 text-center hover:shadow-lg transition flex flex-col items-center"
            >
              {feature.icon}
              <h3 className="text-white text-xl font-semibold mb-2">
                {feature.title}
              </h3>
              <p className="text-white text-sm text-center">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Section: ประเภทผ้าคลุมรถ */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center text-white text-3xl font-semibold mb-10">
          เลือก<span className="text-[#b90002] text-4xl">ประเภท</span>ผ้าคลุม
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[
            {
              title: "ผ้าคลุมรถยนต์",
              type: "SILVER PVC",
              image: Typ1, // เพิ่มภาพเองใน public หรือใช้ T1 ได้
            },
            {
              title: "ผ้าคลุมรถยนต์",
              type: "พลาสติกใสหนา-บาง",
              image: Typ2,
            },
            {
              title: "ผ้าคลุมมอเตอร์ไซค์",
              type: "SILVER PVC",
              image: Typ3,
            },
            {
              title: "ผ้าคลุมมอเตอร์ไซค์",
              type: "พลาสติกใสหนา",
              image: Typ4,
            },
          ].map((item, i) => (
            <div
              key={i}
              className="relative h-[250px] sm:h-[300px] md:h-[350px] overflow-hidden rounded-xl group shadow-lg"
            >
              <Image
                src={item.image}
                alt={item.type}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105 z-0"
              />
              <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center text-white p-4 bg-black/15 group-hover:bg-black/50 transition duration-300">
                <h3 className="text-lg sm:text-xl font-light">{item.title}</h3>
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-wide">
                  {item.type}
                </h2>
                <span className="mt-3 text-yellow-400 font-semibold text-lg">
                  MORE &gt;&gt;
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section: สินค้าแนะนำ */}
      <div className="w-full bg-background py-12 px-4 sm:px-6 lg:px-8">
        <section className="max-w-7xl mx-auto rounded-lg  p-6 md:p-10">
          <h2 className="text-3xl font-semibold mb-6 text-white text-center">
            สินค้าแนะนำ
          </h2>
          {products.length === 0 ? (
            <p className="text-center text-gray-500 text-lg">ยังไม่มีสินค้า</p>
          ) : (
            <div className="w-full">
              <ProductCarousel products={products} />
            </div>
          )}
          <div className="text-center mt-10">
            <a
              href="/product"
              className="no-underline inline-flex items-center gap-2 px-8 py-3 text-white bg-red-600 hover:bg-blue-700 rounded-lg shadow-lg transition duration-300"
            >
              ดูสินค้าทั้งหมด
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>
          </div>
        </section>
      </div>

      {/* Section: เนื้อผ้า */}
      <div className="w-full px-4 py-2">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8">
          {/* ฝั่งซ้าย: ภาพ */}
          <div className="w-full md:w-1/2">
            <Image
              src={Ex1}
              alt="แบนเนอร์"
              placeholder="blur"
              className="w-full h-auto mix-blend-screen"
            />
          </div>

          {/* ฝั่งขวา: ข้อความ */}
          <div className="w-full md:w-1/2">
            <h1 className="text-4xl md:text-5xl text-white font-bold mb-6">
              ไร้รอยต่อ
            </h1>
            <p className="text-xl md:text-2xl text-white leading-relaxed">
              ด้วยนวัตกรรมใหม่ เชื่อมรอยต่อด้วยระบบไฟฟ้าทั้งผืน
              ผิวผ้าเรียบลื่นไร้รอยตะเข็บ พร้อมความทนทานสูง
              ไม่ขาดง่ายแม้ใช้งานหนัก
            </p>
          </div>
        </div>
      </div>

      {/* Section: ตัวอย่างเนื้อผ้า */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center text-white text-3xl font-semibold py-5">
          ตัวอย่าง<span className="text-[#b90002] text-4xl">เนื้อผ้า</span>
          คลุมรถยนต์
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 transform transition duration-500 hover:scale-105 animate-fadeIn"
            >
              <div className="relative w-full h-80">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-5">
                <h3 className="text-xl font-bold text-gray-800 mb-1">
                  {item.title}
                </h3>
                <p className="text-gray-600 mb-3">{item.subtitle}</p>
                <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                  {item.details.map((line, i) => (
                    <li key={i}>{line}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
