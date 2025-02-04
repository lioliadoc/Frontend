import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <Form className="d-flex mb-3">
      <Form.Control
        type="text"
        placeholder="Enter your symptoms..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button variant="secondary" className="ms-2" onClick={handleSearch}>
        Search
      </Button>
    </Form>
  );
};

export default SearchBar;
