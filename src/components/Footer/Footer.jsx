import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaFacebookF, FaLinkedinIn, FaGithub, FaEnvelope } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row className="align-items-center text-center text-md-start">
          {/* Left Side */}
          <Col md={6} className="mb-2 mb-md-0">
           
            <p className="footer-text">© {new Date().getFullYear()} Yousef Sabry | All Rights Reserved</p>
            <span className="text55">Designed & Developed by Yousef Sabry</span>
          </Col>

          {/* Right Side */}
          <Col md={6} className="d-flex justify-content-center justify-content-md-end">
            <a href="yousef.sofah123@email.com" className="footer-icon"><FaEnvelope /></a>
            <a href="https://github.com/yousef-sabry" target="_blank" rel="noopener noreferrer" className="footer-icon"><FaGithub /></a>
            <a href="www.linkedin.com/in/yousef-sabry-b34a51245" target="_blank" rel="noopener noreferrer" className="footer-icon"><FaLinkedinIn /></a>
            <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer" className="footer-icon"><FaFacebookF /></a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
