"use client";

import NextImage from "next/image"; // ✅ เปลี่ยนชื่อ import
import styles from "./page.module.css";
import Footer from "@/components/Footer";
import HeaderNavbar from "@/components/Menu/indexnavbar";
import Newletter from "@/components/Newsletter";
import Logoinfi from "@/components/Img/logo-infinity-2.png";
import Bannerteam from "@/components/Img/infi-yong-group.jpg";
import Icon1 from "@/components/Img/multimedia.png";
import Icon2 from "@/components/Img/online-rating.png";
import Icon3 from "@/components/Img/web-design.png";

import BounceLoader from "react-spinners/DotLoader";
import { useState, useEffect } from "react";
import LogoPic from "@/components/Img/logo-infinity.png";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const img = new window.Image(); // ✅ ใช้ window.Image เพื่อหลีกเลี่ยง conflict
    img.src = LogoPic.src;
    img.onload = () => setTimeout(() => setLoading(false), 300);
  }, []);

  return (
    <>
      {loading && (
        <div className="loading-overlay">
          <img src={LogoPic.src} width="200" alt="Loading Logo" />
          <BounceLoader color="white" loading={loading} size={40} />
        </div>
      )}

      {!loading && (
        <>
          <HeaderNavbar />
          <main className={styles.mainContent}>
            <div className={styles.textCenter}>
              <NextImage
                src={Logoinfi}
                alt="โลโก้บริษัท อินฟินิตี้ มาร์เก็ตติ้ง เน็ตเวิร์ค"
                className={styles.logo}
                priority
              />
              <h1 className={styles.heading}>
                บริษัท อินฟินิตี้ มาร์เก็ตติ้ง เน็ตเวิร์ค จำกัด
              </h1>
              <h2 className={styles.subheading}>
                INFINITY MARKETING NETWORK COMPANY LIMITED
              </h2>
            </div>

            <p className={styles.subtext}>
              ทีมงาน บริษัท อินฟินิตี้ มาร์เก็ตติ้ง เน็ตเวิร์ค จำกัด
              เริ่มเข้าสู่โลกการตลาดออนไลน์ตั้งแต่ปี 2015
              และได้เริ่มจดทะเบียนจัดตั้ง บริษัท อินฟินิตี้ มาร์เก็ตติ้ง
              เน็ตเวิร์ค จำกัด เมื่อปี 2017 ด้วยทุนจดทะเบียน 3 ล้านบาท
              โดยเน้นให้บริการด้าน โฆษณาออนไลน์ และ การตลาดออนไลน์ MU-MARKETING
              การสร้างแบรนด์ MUKETING เพื่อเป็น แบรนด์ผู้นำด้านการตลาดสาย MUTECH
              แนวใหม่ ครบวงจรอย่างแท้จริง
            </p>

            <div className={styles.textCenter}>
              <NextImage
                src={Bannerteam}
                alt="ภาพทีมงาน Infinity Marketing"
                sizes="(max-width: 768px) 100vw, 1000px"
                style={{ width: "100%", height: "auto" }}
                className="rounded-xl shadow-md"
                priority
              />
            </div>

            <div className={styles.gridContainer}>
              <div className={styles.serviceCard}>
                <NextImage
                  src={Icon2}
                  alt="ไอคอนการตลาดออนไลน์"
                  width={50}
                  height={50}
                />
                <h3 className={styles.serviceTitle}>ทำการตลาดออนไลน์</h3>
                <p className={styles.serviceDescription}>
                  เราทำตลาดออนไลน์แบบใหม่ &quot;สายมู&quot;
                  เพื่อดึงดูดพลังงานและสร้างยอดขายที่ปัง
                </p>
              </div>

              <div className={styles.serviceCard}>
                <NextImage src={Icon3} alt="ไอคอนเว็บไซต์" width={50} height={50} />
                <h3 className={styles.serviceTitle}>รับออกแบบ Website</h3>
                <p className={styles.serviceDescription}>
                  ไม่ว่าธุรกิจของคุณจะเล็กหรือใหญ่
                  เราช่วยให้ธุรกิจของคุณเติบโตในโลกออนไลน์
                </p>
              </div>

              <div className={styles.serviceCard}>
                <NextImage
                  src={Icon1}
                  alt="ไอคอนมัลติมีเดีย"
                  width={50}
                  height={50}
                />
                <h3 className={styles.serviceTitle}>รับทำคลิป ภาพ ADS</h3>
                <p className={styles.serviceDescription}>
                  ทำภาพกราฟิก ตัดต่อวิดีโอ เพื่อทำการตลาดทุกช่องทาง
                </p>
              </div>
            </div>
          </main>

          <footer className={styles.footer}>
            <Newletter />
            <Footer />
          </footer>
        </>
      )}
    </>
  );
}
