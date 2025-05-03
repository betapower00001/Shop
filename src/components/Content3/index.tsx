import { Container, Row, Col, Button } from 'react-bootstrap';
import Banner from '../Img/Vector16-11.png';

const MuStopService: React.FC = () => {
  return (
    <Container  className="py-5" style={{ backgroundColor: '#fff' }}>
      <Row className="align-items-center">
        <Col md={6}>
          <h2 style={{ fontWeight: 'bold', color: '#37486e' }}>
            การตลาดสายมูครบวงจร
          </h2>
          <h3 style={{ fontWeight: 'bold', color: '#37486e' }}>MU-Stop Service</h3>
          <p style={{ color: '#5a5a5a', fontSize: '18px', textAlign: 'left', marginTop: '20px' }}>
            เรามุ่งมั่นในการคิดและวางแผนการตลาดที่มีประสิทธิภาพสูงสุด เพื่อให้<br />
            ได้รับผลลัพธ์ที่ดีเยี่ยม ด้วยการนำแนวทางใหม่ ๆ แนวทางแบบประยุกต์ใช้<br />
            ในการวิเคราะห์และประเมินผลโฆษณา<br />
            การทำโฆษณาออนไลน์ในยุคปัจจุบันนั้น มีหลากหลายที่สามารถบรรลุเป้าหมายได้<br />
            ไม่จำเป็นต้องยึดหลักเดิมเสมอไป
          </p>

          <div className="d-flex align-items-center gap-3 mt-4">
            <Button variant="primary">
              ปรึกษาเรา &nbsp;↗
            </Button>
            <span style={{ fontSize: '14', color: '#999' }}>
              Questions? <a href="#" style={{ color: '#7a75f8' }}>Talk to our team</a>
            </span>
          </div>
        </Col>

        <Col md={6} className="text-center">
          <img
            src={Banner.src} // เปลี่ยน path ให้ตรงกับไฟล์ที่ใช้งานจริง
            alt="MU Service Team"
            className="img-fluid"
          />
        </Col>
      </Row>
    </Container>
  );
};

export default MuStopService;
