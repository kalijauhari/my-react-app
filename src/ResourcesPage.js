import React, { useState } from 'react';
import styled from 'styled-components';

const PageContainer = styled.div`
  text-align: center;
`;

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 60vh; /* You can adjust the height as needed */
`;

const SearchBar = styled.input`
  width: 300px;
  padding: 10px;
  font-size: 16px;
`;

const SearchButton = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;
`;

const ResultsContainer = styled.div`
  margin-top: 20px;
`;

const ResourceItem = styled.div`
  background-color: #f2f2f2;
  padding: 10px;
  margin: 10px;
  border-radius: 5px;
`;

const ResourcesPage = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    const searchEndpoint = 'http://localhost:3001/search'; 
    fetch(searchEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ searchKeyword }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => setSearchResults(data.results))
      .catch((error) => console.error('Error:', error));
  };

  return (
    <PageContainer>
      <h1>Resources Page</h1>
      <SearchContainer>
        <SearchBar
          type="text"
          placeholder="Search Resources..."
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
        <SearchButton onClick={handleSearch}>Search</SearchButton>
      </SearchContainer>
      <ResultsContainer>
        {searchResults.map((result, index) => (
          <ResourceItem key={index}>
            <h3>{result.title}</h3>
            <p>{result.description}</p>
            <a href={result.file_path} target="_blank" rel="noopener noreferrer">
              View
            </a>
            {/* Add a download link if you have it */}
          </ResourceItem>
        ))}
      </ResultsContainer>
    </PageContainer>
  );
};

export default ResourcesPage;
