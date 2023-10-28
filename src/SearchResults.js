// SearchResults.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SearchResults = ({ location }) => {
  const searchKeyword = new URLSearchParams(location.search).get('search');

  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/files?search=${searchKeyword}`);
        setFiles(response.data.files);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };

    fetchData();
  }, [searchKeyword]);

  return (
    <div>
      <h2>Search Results</h2>
      <ul>
        {files.map((file, index) => (
          <li key={index}>
            <strong>Title:</strong> {file.title}, <strong>Description:</strong> {file.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;
