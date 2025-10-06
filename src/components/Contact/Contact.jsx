import React, { useRef, useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { FaEnvelope, FaGithub, FaLinkedin, FaPhoneAlt, FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import emailjs from "emailjs-com";
import "./Contact.css";
import "animate.css";

const Contact = () => {
  const formRef = useRef();
  const [status, setStatus] = useState(null);

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_96uzrim", // ✅ Service ID
        "template_1zrce98", // ✅ Template ID
        formRef.current,
        "OGNhxEPfzcU3frNcr" // ✅ Public Key
      )
      .then(
        () => {
          setStatus("success");
          formRef.current.reset();
        },
        () => {
          setStatus("error");
        }
      );
  };

  return (
    <section id="contact" className="contact-section py-5">
      <Container>
        <h5 className="section-subtitle text-center">Let’s Get To Work</h5>
        <h2 className="section-title text-center mb-5">Contact Me</h2>

        <Row className="align-items-center">
          {/* Left Side - Contact Info + Animation */}
          <Col md={5} className="text-center mb-4 mb-md-0 animate__animated animate__fadeInLeft">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1055/1055646.png"
              alt="contact illustration"
              className="contact-img mb-4"
            />
            <h4  className="fw-bold  mb-3">Let's Connect 🚀</h4>
            <p className="">
              I’d love to hear from you! Whether you have a question, a project idea, 
              or just want to say hi — drop me a message anytime.
            </p>

            <div className="contact-info mt-4 text-start">
              <p><FaEnvelope className="me-2 text-primary" /> yousefsabry@gmail.com</p>
              <p><FaPhoneAlt className="me-2 text-success" /> +20 101 234 5678</p>
              <p>
                <FaGithub className="me-2 text-dark" />
                <a href="https://github.com/yousef-sabry" target="_blank" rel="noreferrer">
                  GitHub
                </a>
              </p>
              <p>
                <FaLinkedin className="me-2 text-primary" />
                <a href="https://www.linkedin.com/in/yousef-sabry-b34a51245/" target="_blank" rel="noreferrer">
                  LinkedIn
                </a>
              </p>
              <p><FaHome className="me-2 text-secondary" /> Menoufia, Egypt</p>
            </div>
          </Col>

          {/* Right Side - Form */}
          <Col md={7} className="animate__animated animate__fadeInRight">
            {status === "success" && <Alert variant="success">✅ Message sent successfully!</Alert>}
            {status === "error" && <Alert variant="danger">❌ Something went wrong. Try again.</Alert>}

            <Card className="p-4 shadow border-0 contact-card">
              <Form ref={formRef} onSubmit={sendEmail}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Control
                        type="text"
                        name="title"
                        placeholder="Subject / Title"
                        className="custom-input"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Control
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        className="custom-input"
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    className="custom-input"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Control
                    as="textarea"
                    rows={4}
                    name="message"
                    placeholder="Your Message"
                    className="custom-input"
                    required
                  />
                </Form.Group>

                <Button type="submit" className="send-btn w-100 py-2">
                  Send Message ✉️
                </Button>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Contact;
