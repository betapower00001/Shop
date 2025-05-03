import { Container, Row, Col } from 'react-bootstrap';
import {
  FaFacebookF,
  FaYoutube,
  FaTiktok,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
} from 'react-icons/fa';
import logo from '../Img/logo-infinity.png'; // เปลี่ยน path ตามที่ใช้จริง
import './style.css';

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
                style={{ maxWidth: '180px' }}
              />
              <p>
                <FaMapMarkerAlt className="me-2" />
                48/65 หมู่บ้านพรีเมี่ยมเพลส ซอยคู้บอนรามอินทรา<br />
                ถนนรามอินทรา-ออเงิน เขตคันนายาว กรุงเทพฯ 10230
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
                <li><a href="#">เกี่ยวกับเรา</a></li>
                <li><a href="#">บริการ</a></li>
                <li><a href="#">บทความ</a></li>
              </ul>
            </Col>

            {/* ลิงก์อื่น */}
            <Col md={3} className="text-center text-md-start">
              <h6 className="fw-bold">การตลาด “สายมู” คืออะไร</h6>
              <ul className="list-unstyled">
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Term & Conditions</a></li>
                <li><a href="#">Cookie Policy</a></li>
                <li><a href="#">Contact Us</a></li>
              </ul>
            </Col>

            {/* โซเชียล */}
            <Col md={3} className="text-center text-md-start">
              <h6 className="fw-bold">ติดตามเรา</h6>
              <div className="d-flex justify-content-center justify-content-md-start gap-3 mt-2">
                <a href="#" className="social-icon-sm"><FaFacebookF size={18} /></a>
                <a href="#" className="social-icon-sm"><FaEnvelope size={18} /></a>
                <a href="#" className="social-icon-sm"><FaYoutube size={18} /></a>
                <a href="#" className="social-icon-sm"><FaTiktok size={18} /></a>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
