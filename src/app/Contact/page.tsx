"use client";

import React from "react";
import styles from "./page.module.css";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import HeaderNavbar from "@/components/Menu/indexnavbar";
import Footer from "@/components/Footer";
import Newletter from "@/components/Newsletter";
import { FaFacebookF, FaLine, FaInstagram } from "react-icons/fa";

import BounceLoader from "react-spinners/SyncLoader";
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
          <BounceLoader color="white" loading={loading} size={12.5} />
        </div>
      )}

      {!loading && (
        <>
          <HeaderNavbar />
          <Container className="py-5">
            <h1 className="text-center mb-5 fw-bold">ติดต่อเรา</h1>
            <Row className="g-4">
              <Col md={6}>
                <Card className="p-4 shadow-sm border-0 rounded-4">
                  <h4 className="mb-4 fw-semibold">ข้อมูลการติดต่อ</h4>
                  <p><strong>บริษัท:</strong> <span className="text-muted">บริษัท อินฟินิตี้ มาร์เก็ตติ้ง เน็ตเวิร์ค จำกัด
                  </span></p>
                  <p><strong>โทร:</strong> <span className="text-muted">02-578-1680</span></p>
                  <p><strong>อีเมล:</strong> <span className="text-muted">imn.th@hotmail.com</span></p>
                  <p><strong>ที่อยู่:</strong> <span className="text-muted">48/65 หมู่บ้านพรีเมี่ยมเพลส ซอยสุคนธสวัสดิ์ 38
                    ถนนรามอินทรา-เอกมัย แขวงลาดพร้าว เขตลาดพร้าว กรุงเทพมหานคร 10230</span></p>

                  <div className="d-flex flex-wrap gap-3 mt-4">
                    <Button
                      size="lg"
                      className={`${styles.socialButton} ${styles.facebook}`}
                      href="https://www.facebook.com/8InfinityMarketingTeam"
                      target="_blank"
                    >
                      <FaFacebookF size={20} className="me-2" />
                      Facebook
                    </Button>
                    <Button
                      size="lg"
                      className={`${styles.socialButton} ${styles.line}`}
                      href="https://line.me/ti/p/%40imn.th"
                      target="_blank"
                    >
                      <FaLine size={20} className="me-2" />
                      LINE
                    </Button>
                    <Button
                      size="lg"
                      className={`${styles.socialButton} ${styles.instagram}`}
                      href="https://instagram.com"
                      target="_blank"
                    >
                      <FaInstagram size={20} className="me-2" />
                      Instagram
                    </Button>
                  </div>
                </Card>
              </Col>

              <Col md={6}>
                <Card className="p-4 shadow-sm border-0 rounded-4">
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
                      <Form.Control as="textarea" rows={5} placeholder="พิมพ์ข้อความที่คุณต้องการติดต่อ" />
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

            <hr className="my-5" />

            <Row className="justify-content-center">
              <Col md={10}>
                <div className="rounded-4 overflow-hidden shadow-sm">
                  <iframe
                    title="Google Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3874.070443864393!2d100.62690932413533!3d13.834808495368183!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311d629af6b581c9%3A0x85b6b879c042a20a!2zUHJlbWl1bSBQbGFjZSBFa2FtYWktUmFtaW50cmEg4Liq4Li44LiE4LiZ4LiY4Liq4Lin4Lix4Liq4LiU4Li04LmM!5e0!3m2!1sth!2sth!4v1746415928802!5m2!1sth!2sth" // ลิงก์แผนที่ของคุณ
                    width="100%"
                    height="350"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
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
