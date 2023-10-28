import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import App from './App';
import SearchResults from './SearchResults';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<App />} />
    <Route path="/search-results" element={<SearchResults />} />
  </Routes>
);

export default AppRoutes;
