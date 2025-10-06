import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Navbar.css"; // استيراد ملف CSS المخصص

const CustomNavbar = () => {
  const [time, setTime] = useState(new Date());
  const [expanded, setExpanded] = useState(false); // حالة فتح/غلق النافبار

  // تحديث الوقت كل ثانية
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = time.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const formattedDate = time.toLocaleDateString();

  return (
    <Navbar
      expand="lg"
      className="custom-navbar fixed-top"
      expanded={expanded}
    >
      <Container>
        {/* الشعار */}
        <Navbar.Brand
          as={Link}
          to="/"
          className="text-gold fw-bold"
          onClick={() => setExpanded(false)} // يقفل عند الضغط
        >
          Crypto<span className="text-secondary">App</span>
        </Navbar.Brand>

        {/* زر التوجل */}
        <Navbar.Toggle
          aria-controls="navbar-nav"
          onClick={() => setExpanded(expanded ? false : "expanded")}
        />

        {/* عناصر القائمة */}
        <Navbar.Collapse id="navbar-nav" className="justify-content-between">
          <Nav className="me-auto" onClick={() => setExpanded(false)}>
            <Nav.Link as={Link} to="/" className="nav-link">
              Home
            </Nav.Link>
          
            <Nav.Link as={Link} to="/Converter" className="nav-link">
              Converter
            </Nav.Link>
            <Nav.Link as={Link} to="/Contact" className="nav-link">
              Contact
            </Nav.Link>
          </Nav>

          {/* الوقت والتاريخ */}
          <div className="datetime-container text-light">
            <div className="time text-gold">{formattedTime}</div>
            <div className="date text-secondary">{formattedDate}</div>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
