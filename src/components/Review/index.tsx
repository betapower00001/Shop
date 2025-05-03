import { Container, Carousel, Row, Col } from 'react-bootstrap';
import { FaQuoteRight, FaStar } from 'react-icons/fa';
import Customer1 from '../Img/person-1.png';
import Customer2 from '../Img/person-2.png';

const TestimonialsCarousel = () => {
  const testimonials = [
    {
      name: 'สมเจตน์ ***',
      text: '“การได้ร่วมงานกับคุณเลิศเป็นประสบการณ์ที่น่าจำสำหรับเรา เราหวังว่าจะได้ร่วมงานกันอีกครั้งในอนาคตอันใกล้นี้”',
      image: Customer1,
    },
    {
      name: 'ศุภลักษณ์ ***',
      text: '“เรามีความสุขมากที่ได้เลือก Infinity สำหรับการตลาดสายมู ของเรา พวกเขาสุดยอดมาก”',
      image: Customer2,
    },
    // เพิ่มได้ตามต้องการ
  ];

  // Group testimonials เป็นคู่ ๆ
  const chunked = [];
  for (let i = 0; i < testimonials.length; i += 2) {
    chunked.push(testimonials.slice(i, i + 2));
  }

  return (
    <section className="py-5 bg-light">
      <Container>
        <Row className="align-items-center">
          {/* คอลัมน์ซ้าย: ข้อความหัวข้อ */}
          <Col md={4} className="mb-4 mb-md-0">
            <h2 className="fw-bold text-dark mb-3">Our Happy Customers</h2>
            <p className="text-muted mb-4" style={{ maxWidth: '500px' }}>
              เป้าหมายหลักของเราคือการให้คำปรึกษาที่ดีที่สุดแก่ลูกค้าของเราและช่วยให้พวกเขาเติบโต
            </p>
          </Col>

          {/* คอลัมน์ขวา: Carousel */}
          <Col md={8}>
            <Carousel indicators={false} controls={false} interval={5000} pause={false}>
              {chunked.map((pair, idx) => (
                <Carousel.Item key={idx}>
                  <Row className="justify-content-center">
                    {pair.map((item, i) => (
                      <Col md={6} key={i} className="mb-4">
                        <div className="p-4 shadow rounded bg-white text-center h-100 mx-2">
                          <div className="mb-3 text-warning">
                            {[...Array(5)].map((_, i) => (
                              <FaStar key={i} />
                            ))}
                          </div>
                          <p className="text-muted fst-italic">{item.text}</p>
                          <FaQuoteRight className="text-primary fs-3 mb-3" />
                          <div>
                            <img
                              src={item.image.src}
                              alt={item.name}
                              width="60"
                              height="60"
                              className="rounded-circle mb-2"
                            />
                            <h6 className="fw-bold">{item.name}</h6>
                          </div>
                        </div>
                      </Col>
                    ))}
                  </Row>
                </Carousel.Item>
              ))}
            </Carousel>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default TestimonialsCarousel;
