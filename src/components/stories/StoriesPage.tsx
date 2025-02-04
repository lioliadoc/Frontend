import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Form, Button, ListGroup } from "react-bootstrap";

// Interface for a story
interface Story {
  id: number;
  name: string;
  text: string;
  created_at: string;
  like_count: number;
}

function StoriesPage() {
  // Form inputs
  const [storyName, setStoryName] = useState("");
  const [storyText, setStoryText] = useState("");

  // List of stories
  const [stories, setStories] = useState<Story[]>([]);
  
  // For error or status messages
  const [errorMessage, setErrorMessage] = useState("");

  // 1. Fetch stories on mount (sorted client-side by date desc)
  useEffect(() => {
    fetchAllStories();
  }, []);

  const fetchAllStories = () => {
    axios
      .get("http://127.0.0.1:5000/stories")
      .then((response) => {
        if (response.data && response.data.stories) {
          // Sort by newest first
          const sorted = response.data.stories.sort(
            (a: Story, b: Story) =>
              new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
          setStories(sorted);
        }
      })
      .catch((error) => {
        setErrorMessage("Error fetching stories. Please try again.");
        console.error(error);
      });
  };

  // 2. Handle form submission to create a new story
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!storyName.trim() || !storyText.trim()) {
      setErrorMessage("Please enter both name and text for the story.");
      return;
    }

    // Adjust user_id or like_count as needed in your app
    const newStory = {
      name: storyName.trim(),
      text: storyText.trim(),
      user_id: 1,         // For example if your system requires a user_id
      like_count: 0
    };

    axios
      .post("http://127.0.0.1:5000/stories", newStory)
      .then((res) => {
        // Clear form
        setStoryName("");
        setStoryText("");
        // Refresh the list
        fetchAllStories();
      })
      .catch((error) => {
        setErrorMessage("Error creating story. Please try again.");
        console.error(error);
      });
  };

  // 3. Handle like button
  const handleLike = (storyId: number) => {
    axios
      .put(`http://127.0.0.1:5000/stories/${storyId}/like`)
      .then((res) => {
        // Update local state: increment the like for that story
        setStories((prevStories) =>
          prevStories.map((story) =>
            story.id === storyId ? { ...story, like_count: story.like_count + 1 } : story
          )
        );
      })
      .catch((error) => {
        setErrorMessage("Error liking story. Please try again.");
        console.error(error);
      });
  };

  return (
    <Container fluid className="py-4">
      <Row>
        {/* LEFT SIDE: Form to create a story */}
        <Col xs={12} md={6} className="mb-4">
          <h2>Add Your Story</h2>
          {errorMessage && <p className="text-danger">{errorMessage}</p>}
          <Form onSubmit={handleSubmit}>
            {/* Story Name */}
            <Form.Group controlId="storyName" className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={storyName}
                onChange={(e) => setStoryName(e.target.value)}
                placeholder="Enter your name"
              />
            </Form.Group>

            {/* Story Text */}
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

            <Button variant="primary" type="submit">
              Submit Story
            </Button>
          </Form>
        </Col>

        {/* RIGHT SIDE: Display all stories (sorted by date) */}
        <Col xs={12} md={6}>
          <h2>All Stories</h2>
          {stories.length === 0 && (
            <p>No stories found. Be the first to share!</p>
          )}
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
                    {story.like_count} {story.like_count === 1 ? "like" : "likes"}
                  </span>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}

export default StoriesPage;