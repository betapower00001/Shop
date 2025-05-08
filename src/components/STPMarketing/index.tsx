import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaCheckCircle } from 'react-icons/fa';
import './style.css'; // เชื่อมต่อ CSS (ถ้าคุณวางไว้แยกไฟล์)

const stpData = [
  {
    title: 'Segmentation',
    subtitle: 'การแบ่งส่วนตลาด',
    points: ['การแบ่งส่วน', 'การแบ่งตลาด', 'ความต้องการหรือลักษณะคล้ายกัน'],
  },
  {
    title: 'Targeting',
    subtitle: 'การเลือกกลุ่มเป้าหมาย',
    points: [
      'กลยุทธ์การตลาดเป้าหมาย',
      'มุ่งเน้นไปที่การเลือกกลุ่มเฉพาะ',
      'แคมเปญโฆษณาที่ตรงกลุ่มเป้าหมาย',
    ],
  },
  {
    title: 'Positioning',
    subtitle: 'การวางแผนตำแหน่งสินค้า',
    points: [
      'การวางตำแหน่ง',
      'สร้างภาพลักษณ์ที่แตกต่าง',
      'เน้นคุณภาพและนวัตกรรม',
      'วางตำแหน่งตัวเองให้เป็นตัวเลือกสำคัญ',
    ],
  },
];

const STPSection = () => {
  return (
    <section className="py-5 bg-white text-center">
      <Container>
        <h2 className="fw-bold text-dark">STP Marketing</h2>
        <p className="text-muted mb-5">กลยุทธ์การตลาด</p>
        <Row className="g-4">
          {stpData.map((item, index) => (
            <Col md={4} key={index}>
              <Card className="h-100 border-0 shadow rounded-4 p-3 card-hover">
                <div className="bg-primary text-white rounded-top-4 py-2 fw-semibold">
                  {item.subtitle}
                </div>
                <Card.Body>
                  <Card.Title className="fw-bold text-primary mt-3">{item.title}</Card.Title>
                  <ul className="list-unstyled text-start ps-3 mt-3">
                    {item.points.map((point, idx) => (
                      <li key={idx} className="mb-2 d-flex align-items-start">
                        <FaCheckCircle className="text-primary me-2 mt-1" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </Card.Body>
                <div className="px-3 pb-3">
                  <Button  href="https://line.me/ti/p/%40imn.th" target="_blank" variant="primary" className="w-100 rounded-pill ">
                    ปรึกษาเรา →
                  </Button>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default STPSection;
