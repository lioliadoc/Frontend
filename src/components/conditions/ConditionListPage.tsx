import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import { useLocation, useNavigate, Link } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const API_URL = import.meta.env.VITE_API_URL; 

interface Condition {
  id: number;
  condition_name: string;
}

function ConditionListPage() {
  const query = useQuery();
  const searchTerm = query.get("query") || "";
  const navigate = useNavigate();

  const [conditions, setConditions] = useState<Condition[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (searchTerm) {
      axios
        .get(`${API_URL}/conditions/search`, {
          params: { symptom: searchTerm },
        })
        .then((response) => {
          if (response.data.conditions) {
            setConditions(response.data.conditions);
          } else {
            setErrorMessage("No conditions found.");
            setConditions([]);
          }
        })
        .catch((error) => {
          console.error("Error during search", error);
          setErrorMessage("An error occurred during search.");
        });
    }
  }, [searchTerm]);

  const handleImagesClick = (conditionId: number) => {
    axios
      .get(`${API_URL}/conditions/${conditionId}/images`)
      .then((response) => {
        if (response.data.images) {
          setSelectedImages(response.data.images);
          setShowModal(true);
        }
      })
      .catch((error) => {
        console.error("Error fetching images", error);
      });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedImages([]);
  };

  return (
    <Container className="my-4">
      <Row className="mb-4">
        <Col>
          <h1
            style={{
              fontFamily: "'Pacifico', cursive",
              fontSize: "5rem",
              cursor: "pointer",
            }}
            onClick={() => navigate("/")}
          >
            MamaSkin
          </h1>
        </Col>
      </Row>

      
      <Row className="mb-3">
        <Col>
          <h4>Search results for "{searchTerm}"</h4>
          {errorMessage && <p className="text-danger">{errorMessage}</p>}
          {conditions.length > 0 ? (
            conditions.map((condition) => (
              <div
                key={condition.id}
                className="d-flex justify-content-between align-items-center mb-2"
              >
                <Link to={`/conditions/${condition.id}`}>
                  <strong>{condition.condition_name}</strong>
                </Link>
                <Button
                  variant="link"
                  className="text-secondary"
                  onClick={() => handleImagesClick(condition.id)}
                >
                  Images
                </Button>
              </div>
            ))
          ) : (
            <p>No conditions found.</p>
          )}
        </Col>
      </Row>
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Condition Images</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedImages.map((imgUrl, index) => (
            <img
              key={index}
              src={imgUrl}
              alt={`Condition ${index}`}
              className="img-fluid mb-2"
            />
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default ConditionListPage;