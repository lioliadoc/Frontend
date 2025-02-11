import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function SkincareTipsPage() {
  return (
    <Container className="my-4">
      <Row>
        <Col>
          <h1>Tips for Skincare Routines During Pregnancy</h1>
          <p>
            Pregnancy can bring many changes to your skin. Here are some
            commonly recommended tips to help keep your skin healthy:
          </p>

          <h3>1. Use Gentle Cleansers</h3>
          <p>
            Choose mild, fragrance-free cleansers to avoid irritation. 
            Avoid harsh scrubs and exfoliants, especially if you notice
            increased sensitivity.
          </p>

          <h3>2. Moisturize Regularly</h3>
          <p>
            Keeping skin hydrated can help with dryness and itchiness. Look for
            creams labeled "fragrance-free" and "hypoallergenic." 
            Some people also find relief with creams or oils formulated for
            stretching skin.
          </p>

          <h3>3. Protect Yourself from the Sun</h3>
          <p>
            Use a broad-spectrum sunscreen (SPF 30 or higher). Physical
            sunscreens (with zinc oxide or titanium dioxide) are often
            recommended for sensitive or reactive skin.
          </p>

          <h3>4. Be Cautious with Active Ingredients</h3>
          <p>
            Some skincare ingredients (like certain retinoids) may not be
            recommended during pregnancy. Always check with your healthcare
            provider if you’re unsure.
          </p>

          <h3>5. Stay Hydrated & Mind Your Diet</h3>
          <p>
            Drinking plenty of water and eating a balanced diet can positively
            impact your skin’s appearance during pregnancy. 
          </p>

          <h3>6. When in Doubt, Contact a Professional</h3>
          <p>
            If you have any unusual or severe skin issues, consult a healthcare 
            provider or dermatologist for personalized advice.
          </p>

          <p className="mt-4">
            <strong>Disclaimer:</strong> These tips are for general informational
            purposes only and are not intended as medical advice. Please consult
            your healthcare provider for personalized recommendations.
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default SkincareTipsPage;