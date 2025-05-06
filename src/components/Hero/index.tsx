'use client';

import React from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { FaPhone, FaFacebook } from 'react-icons/fa';
import { SiLine } from 'react-icons/si';
import styles from './HeroSection.module.css'; // import CSS module
import Icon1 from "../Img/80icon-fb-.png";
import Icon2 from "../Img/Line-80.png";
import Icon3 from "../Img/YB-80.png";
import Icon4 from "../Img/tiktok-icon-free-png.png"

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.3, duration: 0.8 }
  })
};

const HeroSection: React.FC = () => {
  return (
    <>
      <div
        className="bg-dark text-white py-5"
        style={{
          background: 'linear-gradient(to right, rgb(11, 65, 146), #00195b)'
        }}
      >
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  visible: { transition: { staggerChildren: 0.2 } }
                }}
              >
                <motion.h1
                  style={{ textAlign: 'center', color:'#f0c670' }}
                  className="fw-bold mb-4"
                  variants={fadeInUp}
                  custom={0}
                >
                  รับทำการตลาด<br /> “สายมูเตลู”
                </motion.h1>

                <motion.div variants={fadeInUp} custom={1}>
                  <p style={{ fontSize: '23px' }}>
                    ทำบุญออนไลน์ ดูดวงออนไลน์ เลขเด็ด เลขมงคลออนไลน์ <br />
                    หรือ รับจัดฮวงจุ้ย ดูดวงออนไลน์ ทัวร์ไหว้พระ<br />
                    ในประเทศและต่างประเทศ
                  </p>
                </motion.div>

                <motion.div variants={fadeInUp} custom={2}>
                  <p style={{ fontSize: '20px' }}>
                    เรามีความมุ่งมั่น ใส่ไอเดียเข้าไปในงาน<br />
                    เพื่อเป็นผู้นำด้านการตลาดสายมู
                  </p>
                </motion.div>

                <motion.div variants={fadeInUp} custom={3}>
                  <p style={{ fontSize: '20px' }}>
                    “MUTECH แนวใหม่ อย่างแท้จริง”<br />
                    ในช่องทาง FACEBOOK, LINE, TIKTOK, Live Creative
                  </p>
                </motion.div>

                <motion.div variants={fadeInUp} custom={4}>
                  <p
                    style={{
                      fontSize: '25px',
                      textTransform: 'capitalize',
                      fontStyle: 'italic',
                      color:'#f0c670'
                    }}
                  >
                    เรามีการตลาดที่เพิ่มมูลค่า ใน “สายมู”<br />
                    เพื่อตอบสนองธุรกิจทางด้านนี้โดยเฉพาะ
                  </p>
                </motion.div>

                <motion.div variants={fadeInUp} custom={5}>
                  <Form className="mb-4" style={{ maxWidth: '450px' }}>
                    <Form.Group className="d-flex" controlId="formEmail">
                      <Form.Control
                        type="email"
                        placeholder="Enter Email Address"
                        className="rounded-0"
                        style={{ border: 'none', padding: '15px' }}
                      />
                      <Button
                        type="submit"
                        aria-label="Start Free Trial"
                        className={styles.hoverScale}
                        style={{
                          background: 'linear-gradient(to right, #42a5f5, #2979ff)',
                          border: 'none',
                          padding: '0 20px',
                          fontWeight: 'bold',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        Start Free Trial →
                      </Button>
                    </Form.Group>
                  </Form>
                </motion.div>

                <motion.div variants={fadeInUp} custom={6}>
                  <div className="d-flex align-items-center mb-3">
                    <FaPhone size={28} className="me-3" />
                    <span style={{ fontSize: '20px' }}>02-578-1680, 061-424-6362</span>
                  </div>
                  <div className="d-flex align-items-center mb-3">
                    <SiLine size={28} className="me-3" />
                    <span style={{ fontSize: '20px' }}>@imn.th</span>
                  </div>
                  <div className="d-flex align-items-center">
                    <FaFacebook size={28} className="me-3" />
                    <span style={{ fontSize: '20px' }}>Infinity Marketing Team</span>
                  </div>
                </motion.div>
              </motion.div>
            </Col>
            {/* สุดด้านซ้าย */}
            <Col md={6} className="text-center mt-4 mt-md-0">
              <div style={{ position: 'relative', display: 'inline-block', width: '100%' }}>
                <motion.img
                  src="/img/im-g-16-1edit.png"
                  alt="สายมูเตลู"
                  className="img-fluid"
                  animate={{ y: [0, -15, 0, 15, 0] }}
                  transition={{ duration: 6, repeat: Infinity, repeatType: 'loop' }}
                />
                <div className={styles.floatingIconsContainer}>
                  <motion.a
                    href="https://www.tiktok.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.icon}
                    animate={{ y: [0, -10, 0], x: [0, 5, 0] }}
                    transition={{ duration: 3, repeat: Infinity, repeatType: 'loop' }}
                  >
                    <img src={Icon4.src} alt="TikTok" />
                  </motion.a>

                  <motion.a
                    href="https://facebook.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.icon}
                    animate={{ y: [0, -8, 0], x: [0, -5, 0] }}
                    transition={{ duration: 3.5, repeat: Infinity, repeatType: 'loop' }}
                  >
                    <img src={Icon1.src} alt="Facebook" />
                  </motion.a>

                  <motion.a
                    href="https://line.me/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.icon}
                    animate={{ y: [0, -12, 0], x: [0, 6, 0] }}
                    transition={{ duration: 4, repeat: Infinity, repeatType: 'loop' }}
                  >
                    <img src={Icon2.src} alt="LINE" />
                  </motion.a>

                  <motion.a
                    href="https://youtube.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.icon}
                    animate={{ y: [0, -10, 0], x: [0, -4, 0] }}
                    transition={{ duration: 3.2, repeat: Infinity, repeatType: 'loop' }}
                  >
                    <img src={Icon3.src} alt="YouTube" />
                  </motion.a>
                </div>
              </div>

            </Col>
          </Row>
        </Container>
      </div>

      {/* Floating Social Icons */}
      <div className={styles.floatingSocialIcons}>
        <motion.a
          href="tel:025781680"
          aria-label="โทร"
          style={{ color: 'white' }}
          whileHover={{ y: -10, scale: 1.2 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <FaPhone size={24} />
        </motion.a>

        <motion.a
          href="https://line.me/R/ti/p/@imn.th"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Line"
          style={{ color: 'white' }}
          whileHover={{ y: -10, scale: 1.2 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <SiLine size={24} />
        </motion.a>

        <motion.a
          href="https://www.facebook.com/8InfinityMarketingTeam"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
          style={{ color: 'white' }}
          whileHover={{ y: -10, scale: 1.2 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <FaFacebook size={24} />
        </motion.a>
      </div>
    </>
  );
};

export default HeroSection;
