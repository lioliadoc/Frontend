
import React, { useState } from "react";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const [showHelpModal, setShowHelpModal] = useState(false);
  const openModal = () => setShowHelpModal(true);
  const closeModal = () => setShowHelpModal(false);

  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    
    if (searchTerm.trim()) {
      navigate(`/conditions?query=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      alert("Please enter a symptom to search.");
    }
  };

  return (
    <Container
      fluid
      className="min-vh-100 d-flex flex-column justify-content-center"
    >
      
      <Row className="w-100 align-items-center">
        
        <Col xs={12} md={6} className="d-flex justify-content-center">
          <img
            src="/assets/home_page_img.jpg"
            alt="Pregnant Woman"
            className="img-fluid"
            style={{ maxWidth: "50%" }} 
          />
        </Col>

        
        <Col xs={12} md={6} className="text-center">
          <h1
            className="homepage-title"
            style={{
              fontSize: "5rem",
              fontFamily: "'Pacifico', cursive",
              cursor: "pointer",
            }}
            onClick={() => navigate("/")}
          >
            MamaSkin
          </h1>
          <p className="homepage-description">
            A web app offering expectant parents information to manage pregnancy-related skin conditions.
          </p>

          
          <Form onSubmit={handleSearch}>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Search a condition (e.g., 'rash on stomach')"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button variant="secondary" type="submit">
                Search
              </Button>
            </InputGroup>
          </Form>

          
          <div className="text-end mt-2">
            <Button variant="link" className="text-secondary" onClick={openModal}>
              How to search a condition
            </Button>
          </div>
          <Row className="justify-content-center mt-4">
            <Col xs="auto">
              <a href="/stories" className="text-decoration-none text-secondary">
                Share Your Pregnancy Story
              </a>
            </Col>
          </Row>
          
          <Row className="justify-content-center mt-3">
            <Col xs="auto">
              <a
                href="/skincare-tips"
                className="text-decoration-none text-secondary"
              >
                Tips for skincare routines during pregnancy
              </a>
            </Col>
            <Col xs="auto">
              <a
                href="/educational-resources"
                className="text-decoration-none text-secondary"
              >
                Educational Resources
              </a>
            </Col>
            <Col xs="auto">
              <a href="/stories" className="text-decoration-none text-secondary">
                Stories
              </a>
            </Col>
          </Row>
        </Col>
      </Row>

      
      <Modal show={showHelpModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>How to Search a Condition</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            <li>Type a brief description of your symptom in the search bar.</li>
            <li>Use keywords like “rash”, “itchy,” “stomach,” etc.</li>
            <li>Click <em>Search</em> to see possible conditions.</li>
          </ul>
          <p>
            <strong>
              If you have urgent concerns, please consult a healthcare professional.
            </strong>
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default HomePage;
