import { Container, Row, Col } from 'react-bootstrap';
import {
    FaFacebookF,
    FaYoutube,
    FaTiktok,
    FaEnvelope,
} from 'react-icons/fa';
import './Newletter.css';

const Newletter = () => {
    return (
        <div className="newsletter-section text-white py-5">
            <Container>
                <Row className="align-items-center text-center text-md-start">
                    <Col md={6}>
                        <h4 className="fw-bold">ติดตามการอัพเดทของเรา</h4>
                        <p>
                            ติดตามข่าวสารล่าสุดเกี่ยวกับแนวโน้มล่าสุดในการตลาดดิจิทัล
                            และรับเคล็ดลับและข้อมูลเชิงลึกพิเศษโดยสมัครรับจดหมายข่าวของเรา
                        </p>
                    </Col>
                    <Col
                        md={6}
                        className="d-flex justify-content-center justify-content-md-end gap-3 mt-3 mt-md-0"
                    >
                        <a href="https://www.facebook.com/8InfinityMarketingTeam" target="_blank" className="social-icon-sm">
                            <FaFacebookF size={20} />
                        </a>
                        <a href="mailto:imn.th@hotmail.com" target="_blank" className="social-icon-sm">
                            <FaEnvelope size={20} />
                        </a>
                        <a href="#" target="_blank" className="social-icon-sm">
                            <FaYoutube size={20} />
                        </a>
                        <a href="#" target="_blank" className="social-icon-sm">
                            <FaTiktok size={20} />
                        </a>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Newletter;
