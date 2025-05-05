// src/components/Navbar.tsx
"use client";
import React from "react";
import { Container, Nav, Navbar as BSNavbar, Button } from "react-bootstrap";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/components/Img/logo-infinity.png";

const Navbar: React.FC = () => {
  return (
    <BSNavbar
      expand="lg"
      variant="dark"
      sticky="top"
      style={{ backgroundColor: "#00195b" }}
    >
      <Container>
        <BSNavbar.Brand as={Link} href="/">
          <Image src={Logo} alt="Infinity Logo" width={150} height={50} />
        </BSNavbar.Brand>

        <BSNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BSNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto d-flex align-items-cente">
            <Nav.Link as={Link} href="/Aboutus">
              เกี่ยวกับเรา
            </Nav.Link>
            <Nav.Link as={Link} href="/Contact">บริการ</Nav.Link>
            <Nav.Link href="#blog">บทความ</Nav.Link>
            <Nav.Link as={Link} href="/Contact" className="me-4">
              ติดต่อ
            </Nav.Link>
          </Nav>
          <Button variant="primary">ปรึกษาฟรี</Button>
        </BSNavbar.Collapse>
      </Container>
    </BSNavbar>
  );
};

export default Navbar;
