// src/components/Navbar.tsx
import React from 'react';
import { Container, Nav, Navbar as BSNavbar, Button } from 'react-bootstrap';
import Icon1 from '../Img/logo-infinity.png';

const Navbar: React.FC = () => {
  return (
    <BSNavbar expand="lg" variant="dark" sticky="top" style={{backgroundColor:'#00195b'}}>
      <Container>
        <BSNavbar.Brand href="#">
        <img src={Icon1.src} alt="Logo 1" style={{ height: '50px' }} />
        </BSNavbar.Brand>
        <BSNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BSNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#about">เกี่ยวกับเรา</Nav.Link>
            <Nav.Link href="#services">บริการ</Nav.Link>
            <Nav.Link href="#blog">บทความ</Nav.Link>
            <Nav.Link href="#contact">ติดต่อ</Nav.Link>
          </Nav>
          <Button variant="primary">ปรึกษาฟรี</Button>
        </BSNavbar.Collapse>
      </Container>
    </BSNavbar>
  );
};

export default Navbar;
