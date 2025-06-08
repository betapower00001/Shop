"use client";

import { Container, Row, Col } from "react-bootstrap";
import {
  FaFacebookF,
  FaYoutube,
  FaTiktok,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";
import logo from "../Img/Shop-logo.png"; // ปรับ path ตามโปรเจกต์ของคุณ
import "./style.css";
import Link from 'next/link';


const Footer = () => {
  return (
    <footer className="custom-footer">
      <div className="footer-main text-white pt-5 pb-4">
        <Container>
          <Row className="gy-4">
            {/* ข้อมูลบริษัท */}
            <Col md={4} className="text-center text-md-start">
              <img
                src={logo.src}
                alt="Infinity Logo"
                className="mb-3 mx-auto d-block"
                style={{ maxWidth: "180px" }}
              />
              <p>
                <FaMapMarkerAlt className="me-2" />
                48/65 หมู่บ้านพรีเมี่ยมเพลส ซอยสุคนธสวัสดิ์ 38 
                <br />
                ถนนรามอินทรา-เอกมัย แขวงลาดพร้าว เขตลาดพร้าว กรุงเทพมหานคร 10230
              </p>
              <div className="d-flex flex-column flex-sm-row justify-content-center justify-content-md-start align-items-center gap-3 mt-2">
                <span className="d-flex align-items-center">
                  <FaPhone className="me-2" />
                  02-578-1680
                </span>
                <span className="d-flex align-items-center">
                  <FaEnvelope className="me-2" />
                  imn.th@hotmail.com
                </span>
              </div>
            </Col>

            {/* เมนู */}
            <Col md={2} className="text-center text-md-start">
              <h6 className="fw-bold">เมนู</h6>
              <ul className="list-unstyled">
                <li>
                  <Link href="/">หน้าแรก</Link>
                </li>
                <li>
                  <Link href="/Aboutus">เกี่ยวกับเรา</Link>
                </li>
                <li>
                  <Link href="#">บริการ</Link>
                </li>
                <li>
                  <Link href="/Articles">บทความ</Link>
                </li>
                <li>
                  <Link href="/Contact">ติดต่อ</Link>
                </li>
              </ul>
            </Col>

            {/* ลิงก์อื่น */}
            <Col md={3} className="text-center text-md-start">
              <h6 className="fw-bold">การตลาด “สายมู” คืออะไร</h6>
              <ul className="list-unstyled">
                <li>
                  <Link href="#">รู้จักสายมู</Link>
                </li>
                <li>
                  <Link href="#">กลยุทธ์มูเตลู</Link>
                </li>
                <li>
                  <Link href="#">ตัวอย่างเด็ด</Link>
                </li>
                <li>
                  <Link href="#">ข้อควรระวัง</Link>
                </li>
              </ul>
            </Col>

            {/* โซเชียล */}
            <Col md={3} className="text-center text-md-start">
              <h6 className="fw-bold">ติดตามเรา</h6>
              <div className="d-flex justify-content-center justify-content-md-start gap-3 mt-2">
                <a href="https://www.facebook.com/8InfinityMarketingTeam" target="_blank" className="social-icon-sm">
                  <FaFacebookF size={18} />
                </a>
                <a href="mailto:imn.th@hotmail.com" target="_blank" className="social-icon-sm">
                  <FaEnvelope size={18} />
                </a>
                <a href="#" target="_blank" className="social-icon-sm">
                  <FaYoutube size={18} />
                </a>
                <a href="#" target="_blank" className="social-icon-sm">
                  <FaTiktok size={18} />
                </a>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <div
        className="footer-bottom text-center text-white py-3"
        style={{ backgroundColor: "#05143f" }}
      >
        © 2025 Copyright:{" "}
        <a
          href="https://imn.co.th"
          className="text-white text-decoration-none"
        >
          INFINITY MARKETING NETWORK
        </a>
      </div>
    </footer>
  );
};

export default Footer;
