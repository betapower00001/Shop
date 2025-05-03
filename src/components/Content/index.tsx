import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FaArrowRight } from 'react-icons/fa';

const MarketingSection: React.FC = () => {
  return (
    <div className="py-5 bg-white text-dark">
      <Container>
        <Row className="align-items-center">
          {/* ฝั่งซ้าย */}
          <Col md={6} className="mb-4 mb-md-0">
            <h2 style={{ fontWeight: 'bold', fontSize: '2.5rem', color:'#1b2e59',textAlign:'center' }}>
              ให้คำแนะนำ<br />
              การตลาดออนไลน์<br /></h2>
             <p style={{fontSize:'50px',fontWeight:'bolder',color:'#1b2e59',textAlign:'center' }}> “สายมู”<br />
             <span className="d-block">MU MARKETING</span></p><br />
          </Col>

          {/* ฝั่งขวา */}
          <Col md={6}>
            <div style={{color:'#636363', fontSize:'20px', fontWeight:'100px',textAlign: 'left' }}>
                
            <p style={{ textIndent: '2em' }}>บริษัทฯ การโปรโมทโฆษณา ทำการตลาด สายมูเตลู<br />
              ทำบุญออนไลน์ ดูดวงออนไลน์ เลขเด็ด เลขมงคลออนไลน์<br />
              หรือ รับจัดฮวงจุ้ย ดูดวงออนไลน์ ทัวร์ไหว้พระ <br />ในประเทศและต่างประเทศ<br /></p>
              <p style={{ textIndent: '2em' }}>รูปแบบการทำงาน แบบ TEAMWORK มีหลายส่วน<br />ร่วมกัน
              แบ่งส่วนของ Officer และ Production รวมถึง<br /> Partner
              มีความมุ่งมั่น ใส่ไอเดียเข้าไปในงาน เพื่อเป็น<br />ผู้นำด้านการตลาดสายมู
              MUTECH แนวใหม่ อย่างแท้จริง</p>
            </div>

            <Button variant="link" className="text-primary fw-bold p-0">
              INFINITY MARKETING NETWORK <FaArrowRight className="ms-2" />
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MarketingSection;
