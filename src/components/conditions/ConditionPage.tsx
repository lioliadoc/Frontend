import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Spinner, Alert, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import './ConditionListPage.css';

const API_URL = import.meta.env.VITE_API_URL;

function ConditionPage() {
  const { conditionId } = useParams();
  const navigate = useNavigate();
  
  const [condition, setCondition] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCondition = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/conditions/${conditionId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCondition(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (conditionId) {
      fetchCondition();
    }
  }, [conditionId]);


  const parseReferences = (refs) => {
    if (!refs) return [];
    return refs.split(/[\n,;]+/).map((ref) => ref.trim()).filter(Boolean);
  };

  if (loading) {
    return (
      <Container className="my-5 text-center" style={{ fontSize: '1.2rem' }}>
        <Row className="mb-4">
          <Col>
            <h1
              style={{
                fontFamily: "'Pacifico', cursive",
                fontSize: '5rem',
                cursor: 'pointer',
              }}
              onClick={() => navigate('/')}
            >
              MamaSkin
            </h1>
          </Col>
        </Row>
        <Spinner animation="border" variant="secondary" />
        <p className="mt-3">Loading condition details...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="my-5" style={{ fontSize: '1.2rem' }}>
        <Row className="mb-4">
          <Col>
            <h1
              style={{
                fontFamily: "'Pacifico', cursive",
                fontSize: '5rem',
                cursor: 'pointer',
              }}
              onClick={() => navigate('/')}
            >
              MamaSkin
            </h1>
          </Col>
        </Row>
        <Alert variant="danger">{error}</Alert>
        <Button variant="outline-secondary" onClick={() => navigate(-1)}>
          Go Back
        </Button>
      </Container>
    );
  }

  if (!condition) {
    return (
      <Container className="my-5" style={{ fontSize: '1.2rem' }}>
        <Row className="mb-4">
          <Col>
            <h1
              style={{
                fontFamily: "'Pacifico', cursive",
                fontSize: '5rem',
                cursor: 'pointer',
              }}
              onClick={() => navigate('/')}
            >
              MamaSkin
            </h1>
          </Col>
        </Row>
        <Alert variant="warning">No condition found.</Alert>
        <Button variant="outline-secondary" onClick={() => navigate(-1)}>
          Go Back
        </Button>
      </Container>
    );
  }

  const referenceLinks = parseReferences(condition.references);

  return (
    
    <Container className="my-5" style={{ fontSize: '1.2rem' }}>
       <Row className="mb-4">
        <Col>
          <h1
            style={{
              fontFamily: "'Pacifico', cursive",
              fontSize: '5rem',
              cursor: 'pointer',
            }}
            onClick={() => navigate('/')}
          >
            MamaSkin
          </h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>
            {condition.name}
          </h1>
          <p>
            <strong>Description:</strong> {condition.description}
          </p>

          <div style={{ margin: '1rem 0' }}>
            <strong>References:</strong>
            {referenceLinks.length > 0 ? (
              <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
                {referenceLinks.map((ref, index) => (
                  <li key={index} style={{ marginBottom: '0.5rem' }}>
                    <a
                      href={ref}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: 'underline', color: '#00008B' }}
                    >
                      {ref}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No references provided.</p>
            )}
          </div>

          <p>
            <strong>Requires Healthcare Provider?: </strong>
            {condition.requires_healthcare_provider === "Yes" 
              ? "Yes, please consult a professional."
              : "No, self-care might be sufficient."
            }
          </p>

          <Button
            variant="outline-secondary"
            onClick={() => navigate(-1)}>
          
            Back to Conditions
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default ConditionPage;