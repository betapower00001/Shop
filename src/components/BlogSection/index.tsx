// src/components/BlogSection.tsx
import React from 'react';
import { Container, Row, Col, Card, Badge, Button } from 'react-bootstrap';
import Piccontenct1 from '../Img/contant-4.jpg';
import Piccontenct2 from '../Img/contant-2.jpg';
import Piccontenct3 from '../Img/contant-3.jpg';

interface BlogPost {
  title: string;
  category: string;
  image: string;
  link: string;
}

const blogPosts: BlogPost[] = [
  {
    title: 'เปิด TikTok ยังไงให้ไวรัล ปี 2025',
    category: 'TikTok',
    image: Piccontenct1.src,
    link: '#',
  },
  {
    title: 'Search Intent คืออะไร ทำ SEO ให้แม่นเข้าเป้า',
    category: 'WordPress',
    image: Piccontenct2.src,
    link: '#',
  },
  {
    title: 'เปลี่ยน WordPress ให้แซงคู่แข่ง',
    category: 'SEO',
    image: Piccontenct3.src,
    link: '#',
  },

];

const BlogSection: React.FC = () => {
  return (
    <section className="py-5" id="blog" style={{ background: 'linear-gradient(to right, rgb(11, 65, 146), #00195b)' }}>
      <Container>
        <h2 className="text-center mb-4" style={{ color: '#d45189' }}>บทความ</h2>
        <div className="text-center mb-4" style={{ color: 'white', fontSize: '35px', fontWeight: 'bold' }}>ความรู้เกี่ยวกับการตลาด</div>
        <Row className="g-4">
          {blogPosts.map((post, idx) => (
            <Col md={4} key={idx}>
              <Card className="h-100 shadow-sm">
                <Card.Img variant="top" src={post.image} />
                <Card.Body>
                  <Badge bg="primary" className="mb-2">{post.category}</Badge>
                  <Card.Title>{post.title}</Card.Title>
                  <Button variant="outline-primary" size="sm" href={post.link}>
                    อ่านเพิ่มเติม
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default BlogSection;
