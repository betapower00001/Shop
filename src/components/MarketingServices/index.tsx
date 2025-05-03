import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./stely.css"; // 👈 นำเข้า CSS ที่แยกออกมา

import PicBanner from "../Img/infi-yong-group.jpg";
import IconPersona from "../Img/IconCustomer.png";
import IconContent from "../Img/IconContent.png";
import IconSEO from "../Img/IconSeo.png";
import IconSEM from "../Img/IconSem.png";
import IconSocial from "../Img/IconSocial.png";
import IconData from "../Img/IconData.png";

interface Service {
    title: string;
    description: string;
    icon: string;
}

const services: Service[] = [
    {
        title: "Customer Persona Insight",
        description: "ข้อมูลเชิงลึกของกลุ่มเป้าหมายเพื่อวิเคราะห์การตลาดอย่างมีประสิทธิภาพ",
        icon: IconPersona.src,
    },
    {
        title: "Content Marketing",
        description: "สร้างคอนเทนต์ที่เหมาะสมเพื่อดึงดูดและสร้างความสัมพันธ์กับลูกค้า",
        icon: IconContent.src,
    },
    {
        title: "SEO Marketing",
        description: "ปรับแต่งเว็บไซต์ให้ติดอันดับการค้นหาบน Google เพื่อเพิ่มการมองเห็น",
        icon: IconSEO.src,
    },
    {
        title: "SEM Marketing",
        description: "โฆษณาแบบจ่ายต่อคลิกเพื่อเพิ่มทราฟฟิกและยอดขายอย่างรวดเร็ว",
        icon: IconSEM.src,
    },
    {
        title: "Social Media Marketing",
        description: "ทำการตลาดผ่าน Social Media เพื่อสร้างการรับรู้และความผูกพันกับกลุ่มเป้าหมาย",
        icon: IconSocial.src,
    },
    {
        title: "Data-Driven Marketing",
        description: "ใช้ข้อมูลเพื่อวิเคราะห์และวางแผนกลยุทธ์การตลาดให้ตรงกลุ่มเป้าหมาย",
        icon: IconData.src,
    },
];

const Content2: React.FC = () => {
    return (
        <div className="marketing-section">
            <Container>
                <div className="banner-wrapper">
                    <img src={PicBanner.src} alt="ทีมงานของเรา" className="team-image" />
                </div>

                <Row className="g-4" style={{textAlign:'left'}}>
                    {services.map((service, index) => (
                        <Col md={6} key={index}>
                            <Card className="marketing-card">
                                <Card.Body className="d-flex align-items-start gap-3">
                                    <img
                                        src={service.icon}
                                        alt={service.title}
                                        className="marketing-icon"
                                    />
                                    <div>
                                        <Card.Title className="marketing-title">
                                            {service.title}
                                        </Card.Title>
                                        <Card.Text className="marketing-description">
                                            {service.description}
                                        </Card.Text>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
};

export default Content2;
