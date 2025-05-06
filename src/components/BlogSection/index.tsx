import React from 'react';
import { Container, Row, Col, Card, Badge, Button } from 'react-bootstrap';
import Piccontenct1 from '../Img/contant-4.jpg';
import Piccontenct2 from '../Img/contant-2.jpg';
import Piccontenct4 from '../Img/contant-1.jpg'
import Link from "next/link";
import styles from './BlogSection.module.css';

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
    link: '/Articles/tiktok-viral-2025',
  },
  {
    title: 'Search Intent คืออะไร ทำ SEO ให้แม่นเข้าเป้า',
    category: 'SEO',
    image: Piccontenct4.src,
    link: '/Articles/Search-Intent-SEO',
  },
  {
    title: 'เว็บไซต์ WordPress คืออะไร',
    category: 'Wordpress',
    image: Piccontenct2.src,
    link: '/Articles/About-Wordpress',
  },
];

const BlogSection: React.FC = () => {
  return (
    <section
      className={`py-5 ${styles.sectionWrapper}`}
      id="blog"
      style={{ background: 'linear-gradient(to right, rgb(11, 65, 146), #00195b)' }}
    >
      <Container>
        <h2 className="text-center mb-4" style={{ color: '#d45189' }}>บทความ</h2>
        <div className="text-center mb-4" style={{ color: 'white', fontSize: '35px', fontWeight: 'bold' }}>
          ความรู้เกี่ยวกับการตลาด
        </div>
        <Row className="g-4">
          {blogPosts.map((post, idx) => (
            <Col md={4} key={idx}>
              <Card className={`h-100 shadow-sm ${styles.card}`}>
                <Card.Img variant="top" src={post.image} />
                <Card.Body>
                  <Badge bg="primary" className="mb-2">{post.category}</Badge>
                  <Card.Title>{post.title}</Card.Title>
                  <Link href={post.link} passHref>
                    <Button variant="outline-primary" size="sm" className={styles.readMoreBtn}>
                      อ่านเพิ่มเติม
                    </Button>
                  </Link>
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
