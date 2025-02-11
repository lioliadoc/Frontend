import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function EducationalResourcesPage() {
    const navigate = useNavigate();
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
      <Row>
        <Col>
          <h1>Educational Resources</h1>
          <p>
            Below are some reputable resources to learn more about pregnancy-related
            topics, including skincare and general maternal health.
          </p>

          <h3>1. Official Medical Organizations</h3>
          <ul>
            <li>
              <a
                href="https://www.acog.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                American College of Obstetricians and Gynecologists (ACOG)
              </a>
            </li>
            <li>
              <a
                href="https://www.who.int/health-topics/pregnancy"
                target="_blank"
                rel="noopener noreferrer"
              >
                World Health Organization (WHO) - Pregnancy
              </a>
            </li>
          </ul>

          <h3>2. Pregnancy and Skin Care Websites</h3>
          <ul>
            <li>
              <a
                href="https://www.marchofdimes.org/find-support/topics/pregnancy"
                target="_blank"
                rel="noopener noreferrer"
              >
                March of Dimes - Pregnancy
              </a>
            </li>
            <li>
              <a
                href="https://dermatology.ca/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Dermatology.ca
              </a>{" "}
              (Canadian Dermatology Association)
            </li>
          </ul>

          <h3>3. Recommended Reading</h3>
          <ul>
            <li>
              <em>What to Expect When You’re Expecting</em> by Heidi Murkoff
            </li>
            <li>
              <em>The Mayo Clinic Guide to a Healthy Pregnancy</em> 
            </li>
          </ul>

          <p className="mt-4">
            <strong>Disclaimer:</strong> This list is for informational purposes only.
            Always discuss personal health concerns with a qualified healthcare provider.
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default EducationalResourcesPage;