import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Form, Button, ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL

interface Story {
  id: number;
  name: string;
  text: string;
  created_at: string;
  like_count: number;
}

function StoriesPage() {
  const navigate = useNavigate();
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loadingAuth, setLoadingAuth] = useState(true);

  const [storyName, setStoryName] = useState("");
  const [storyText, setStoryText] = useState("");
  const [stories, setStories] = useState<Story[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    checkAuthStatus();
    fetchAllStories();
  }, []);

  const checkAuthStatus = () => {
    axios
      .get(`${API_URL}/api/auth-status`, { withCredentials: true })
      .then((response) => {
        setIsLoggedIn(response.data.logged_in);
      })
      .catch((error) => {
        console.error("Error checking auth status:", error);
      })
      .finally(() => {
        setLoadingAuth(false);
      });
  };

  const fetchAllStories = () => {
    axios
      .get(`${API_URL}/stories`)
      .then((response) => {
        if (response.data && response.data.stories) {
          const sorted = response.data.stories.sort(
            (a: Story, b: Story) =>
              new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
          setStories(sorted);
        }
      })
      .catch((error) => {
        setErrorMessage("Error fetching stories.");
        console.error(error);
      });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!isLoggedIn) {
      setErrorMessage("You must be logged in to add a story.");
      return;
    }
    if (!storyName.trim() || !storyText.trim()) {
      setErrorMessage("Please enter both name and text.");
      return;
    }

    const newStory = {
      name: storyName.trim(),
      text: storyText.trim(),
      user_id: 1,
      like_count: 0
    };

    axios
      .post(`${API_URL}/stories`, newStory, { withCredentials: true })
      .then(() => {
        setStoryName("");
        setStoryText("");
        fetchAllStories();
      })
      .catch((error) => {
        setErrorMessage("Error creating story.");
        console.error(error);
      });
  };

  const handleLike = (storyId: number) => {
    if (!isLoggedIn) {
      setErrorMessage("You must be logged in to like a story.");
      return;
    }
    axios
      .put(`${API_URL}/stories/${storyId}/like`, null, { withCredentials: true })
      .then(() => {
        setStories((prev) =>
          prev.map((story) =>
            story.id === storyId
              ? { ...story, like_count: story.like_count + 1 }
              : story
          )
        );
      })
      .catch((error) => {
        setErrorMessage("Error liking story.");
        console.error(error);
      });
  };

  if (loadingAuth) {
    return <p>Checking authentication...</p>;
  }

  return (
    <Container fluid className="py-4">
      <Row>
        <Col xs={12} md={6} className="mb-4">
          <h2>Add Your Story</h2>
          {errorMessage && <p className="text-danger">{errorMessage}</p>}

          {isLoggedIn ? (
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="storyName" className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={storyName}
                  onChange={(e) => setStoryName(e.target.value)}
                  placeholder="Enter your name"
                />
              </Form.Group>

              <Form.Group controlId="storyText" className="mb-3">
                <Form.Label>Story</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  value={storyText}
                  onChange={(e) => setStoryText(e.target.value)}
                  placeholder="Share your experience..."
                />
              </Form.Group>

              <Button variant="secondary" type="submit">
                Submit Story
              </Button>
            </Form>
          ) : (
            <div>
              <p className="text-muted">You must log in to share a story.</p>
              <Button
                variant="outline-primary"
                onClick={() => window.location.href = `${API_URL}/login/force-login`}
            
              >
                Log In via Google
              </Button>
            </div>
          )}
        </Col>

        <Col xs={12} md={6}>
          <h2>All Stories</h2>
          {stories.length === 0 ? (
            <p>No stories found. Be the first to share!</p>
          ) : (
            <ListGroup>
              {stories.map((story) => (
                <ListGroup.Item key={story.id} className="d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-center">
                    <strong>{story.name}</strong>
                    <small className="text-muted">
                      {new Date(story.created_at).toLocaleString()}
                    </small>
                  </div>
                  <div className="mt-2">{story.text}</div>
                  <div className="mt-3 d-flex align-items-center">
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleLike(story.id)}
                    >
                      ♥ Like
                    </Button>
                    <span className="ms-2">
                      {story.like_count}{" "}
                      {story.like_count === 1 ? "like" : "likes"}
                    </span>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default StoriesPage;