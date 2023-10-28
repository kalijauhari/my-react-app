import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios'; // You'll need to install Axios

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

const GroupsPage = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [noResultsMessage, setNoResultsMessage] = useState('');

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/api/search-groups?keyword=${searchKeyword}`);
      if (response.status === 200) {
        const data = response.data;
        if (data.length === 0) {
          setNoResultsMessage('No groups found');
        } else {
          setNoResultsMessage(''); // Clear the "No groups found" message if results are found
        }
        setSearchResults(data);
      } else {
        console.error('Error searching for groups');
      }
    } catch (error) {
      console.error('An error occurred while searching:', error);
    }
  };

  return (
    <PageContainer>
      <h1>Groups Page</h1>
      <SearchContainer>
        <SearchBar
          type="text"
          placeholder="Search Groups..."
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
        <SearchButton onClick={handleSearch}>Search</SearchButton>
      </SearchContainer>
      {/* Display search results or "No groups found" message */}
      {searchResults.length === 0 && <p>{noResultsMessage}</p>}
      {searchResults.map((result, index) => (
        <div key={index}>
          <h2>{result.name}</h2>
          <p>{result.description}</p>
        </div>
      ))}
    </PageContainer>
  );
};

export default GroupsPage;
