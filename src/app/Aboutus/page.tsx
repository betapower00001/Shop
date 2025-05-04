import Image from "next/image";
import styles from "./page.module.css";
import Footer from "@/components/Footer";
import HeaderNavbar from "@/components/Menu/indexnavbar"
import Newletter from "@/components/Newsletter";
import Logoinfi from "@/components/Img/logo-infinity-2.png";
import Banner from "@/components/Img/infi-yong-group.jpg";

export default function Home() {
  return (
    <>
      <main className={styles.mainContent}>
        <HeaderNavbar />
        {/* โลโก้และชื่อบริษัท */}
        <div className="text-center">
          <Image
            src={Logoinfi.src}
            alt="Infinity Logo"
            width={120}
            height={120}
            className={styles.logo}
          />
          <h1 className={styles.heading}>
            บริษัท อินฟินิตี้ มาร์เก็ตติ้ง เน็ตเวิร์ค จำกัด
          </h1>
          <h2 className={styles.subheading}>
            INFINITY MARKETING NETWORK COMPANY LIMITED
          </h2>
        </div>

        {/* ข้อความแนะนำบริษัท */}
        <p className={styles.subtext}>
          ทีมงาน บริษัท อินฟินิตี้ มาร์เก็ตติ้ง เน็ตเวิร์ค จำกัด
          เริ่มเข้าสู่โลกการตลาดออนไลน์ตั้งแต่ปี 2015
          และได้เริ่มจดทะเบียนจัดตั้ง บริษัท อินฟินิตี้ มาร์เก็ตติ้ง เน็ตเวิร์ค
          จำกัด เมื่อปี 2017 ด้วยทุนจดทะเบียน 3 ล้านบาท โดยเน้นให้บริการด้าน
          โฆษณาออนไลน์ และ การตลาดออนไลน์ MU-MARKETING การสร้างแบรนด์ MUKETING
          เพื่อเป็น แบรนด์ผู้นำด้านการตลาดสาย MUTECH แนวใหม่ ครบวงจรอย่างแท้จริง
        </p>

        {/* ภาพทีมงาน */}
        <div className="flex justify-center mt-8">
          <Image
            src={Banner.src}
            alt="Team Photo"
            width={800}
            height={400}
            className="rounded-xl shadow-md mx-auto block"
          />
        </div>

        {/* บริการ 3 ช่อง */}
        <div className={styles.gridContainer}>
          {/* บริการ 1 */}
          <div className={styles.serviceCard}>
            <Image
              src="/icon-online-marketing.png"
              alt="Marketing Icon"
              width={50}
              height={50}
            />
            <h3 className={styles.serviceTitle}>ทำการตลาดออนไลน์</h3>
            <p className={styles.serviceDescription}>
              เราทำตลาดออนไลน์แบบใหม่ "สายมู"
              เพื่อดึงดูดพลังงานและสร้างยอดขายที่ปัง
            </p>
          </div>

          {/* บริการ 2 */}
          <div className={styles.serviceCard}>
            <Image
              src="/icon-website.png"
              alt="Website Icon"
              width={50}
              height={50}
            />
            <h3 className={styles.serviceTitle}>รับออกแบบ Website</h3>
            <p className={styles.serviceDescription}>
              ไม่ว่าธุรกิจของคุณจะเล็กหรือใหญ่
              เราช่วยให้ธุรกิจของคุณเติบโตในโลกออนไลน์
            </p>
          </div>

          {/* บริการ 3 */}
          <div className={styles.serviceCard}>
            <Image src="/icon-ads.png" alt="Ads Icon" width={50} height={50} />
            <h3 className={styles.serviceTitle}>รับทำคลิป ภาพ ADS</h3>
            <p className={styles.serviceDescription}>
              ทำภาพกราฟิก ตัดต่อวิดีโอ เพื่อทำการตลาดทุกช่องทาง
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <Newletter />
        <Footer />
      </footer>
    </>
  );
}
