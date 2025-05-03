import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const Services: React.FC = () => {
  const serviceList = [
    { title: "เว็บไซต์องค์กร", icon: "🌐" },
    { title: "เว็บไซต์ขายของ", icon: "🛒" },
    { title: "เว็บไซต์จองบริการ", icon: "📅" },
  ];

  return (
    <Container id="services" className="py-5">
      <h2 className="text-center mb-4">บริการของเรา</h2>
      <Row>
        {serviceList.map((service, i) => (
          <Col md={4} key={i} className="mb-4">
            <Card className="h-100 text-center">
              <Card.Body>
                <div style={{ fontSize: "2rem" }}>{service.icon}</div>
                <Card.Title>{service.title}</Card.Title>
                <Card.Text>รายละเอียดบริการแบบย่อ</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Services;
