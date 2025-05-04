"use client";

import React from "react";
import styles from "./page.module.css";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import HeaderNavbar from "@/components/Menu/indexnavbar";
import Footer from "@/components/Footer";
import Newletter from "@/components/Newsletter";
import { FaFacebookF, FaLine, FaInstagram } from "react-icons/fa";

import BounceLoader from "react-spinners/DotLoader";
import { useState, useEffect } from "react";
import LogoPic from "@/components/Img/logo-infinity.png";

const ContactPage: React.FC = () => {
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
          <Container className="py-5">
            <h1 className="text-center mb-4">ติดต่อเรา</h1>
            <Row className="justify-content-center">
              <Col md={6}>
                <Card className="p-4 shadow-lg rounded-4 border-0">
                  <Form>
                    <Form.Group controlId="formName" className="mb-3">
                      <Form.Label>ชื่อของคุณ</Form.Label>
                      <Form.Control type="text" placeholder="กรอกชื่อของคุณ" />
                    </Form.Group>

                    <Form.Group controlId="formEmail" className="mb-3">
                      <Form.Label>อีเมล</Form.Label>
                      <Form.Control type="email" placeholder="your@email.com" />
                    </Form.Group>

                    <Form.Group controlId="formMessage" className="mb-4">
                      <Form.Label>ข้อความ</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={5}
                        placeholder="พิมพ์ข้อความที่คุณต้องการติดต่อ"
                      />
                    </Form.Group>

                    <div className="d-grid">
                      <Button variant="primary" type="submit" size="lg">
                        ส่งข้อความ
                      </Button>
                    </div>
                  </Form>
                </Card>
              </Col>
            </Row>

            {/* Contact Info & Social */}
            <Row className="mt-5">
              <Col md={6} className="mb-4">
                <h4>ข้อมูลการติดต่อ</h4>
                <p>
                  <strong>บริษัท:</strong> อินฟินิตี้ มาร์เก็ตติ้ง เน็ตเวิร์ค
                </p>
                <p>
                  <strong>โทร:</strong> 089-xxx-xxxx
                </p>
                <p>
                  <strong>อีเมล:</strong> contact@infinity.co.th
                </p>
                <p>
                  <strong>ที่อยู่:</strong> 123 ถนนหลัก แขวงตัวอย่าง เขตตัวอย่าง
                  กรุงเทพฯ
                </p>

                <div className="d-flex flex-wrap gap-3 mt-4">
                  <Button
                    size="lg"
                    className={`${styles.socialButton} ${styles.facebook}`}
                    href="https://facebook.com/yourpage"
                    target="_blank"
                  >
                    <FaFacebookF size={20} />
                    Facebook
                  </Button>

                  <Button
                    size="lg"
                    className={`${styles.socialButton} ${styles.line}`}
                    href="https://line.me/R/ti/p/~yourline"
                    target="_blank"
                  >
                    <FaLine size={20} />
                    LINE
                  </Button>

                  <Button
                    size="lg"
                    className={`${styles.socialButton} ${styles.instagram}`}
                    href="https://instagram.com/youraccount"
                    target="_blank"
                  >
                    <FaInstagram size={20} />
                    Instagram
                  </Button>
                </div>
              </Col>

              <Col md={6}>
                <iframe
                  title="Google Map"
                  src="https://www.google.com/maps/embed?pb=..." // เปลี่ยนเป็นลิงก์แผนที่ของคุณ
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                />
              </Col>
            </Row>
          </Container>
          <Newletter />
          <Footer />
        </>
      )}
    </>
  );
};

export default ContactPage;
