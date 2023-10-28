// App.js
import React from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import GroupsPage from './GroupsPage'; 
import ResourcesPage from './ResourcesPage'; 
import UploadPage from './UploadPage'; 
import CreateGroupForm from './CreateGroupForm'; 
import JoinGroupForm from './JoinGroupForm'; 

const Container = styled.div`
  /* Your styling for the main container */
`;

const Header = styled.div`
  background-color: #333;
  color: white;
  padding: 10px 0;
  display: flex;
  align-items: center;
`;

const Logo = styled.div`
  margin-left: 20px;
  font-size: 24px;
`;

const Navigation = styled.div`
  margin-left: auto;
  margin-right: 20px;
`;

const NavItem = styled(Link)`
  color: white;
  text-decoration: none;
  margin-right: 20px;
  font-size: 18px;
`;

const ButtonLink = styled(Link)`
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  text-decoration: none;
  font-size: 16px;
  display: block;
  width: 150px; /* Adjust the width as needed */
  margin-bottom: 10px; /* Adds space between the buttons */
  text-align: center; /* Center the button text */
`;

const App = () => {
  return (
    <Router>
      <Container>
        <Header>
          <Logo>StudyDome</Logo>
          <Navigation>
            <NavItem to="/">Home</NavItem>
            <NavItem to="/groups">Groups</NavItem>
            <NavItem to="/resources">Resources</NavItem>
            <NavItem to="/upload">Upload</NavItem>
          </Navigation>
        </Header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/groups" element={<GroupsPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/create-group" element={<CreateGroupForm />} />
          <Route path="/join-group" element={<JoinGroupForm />} />
        </Routes>
      </Container>
    </Router>
  );
};

const Home = () => {
  return (
    <div>
      <h1>Welcome to StudyDome</h1>
      <ButtonLink to="/join-group">Join a Group</ButtonLink>
      <ButtonLink to="/create-group">Create a Group</ButtonLink>
    </div>
  );
};

export default App;
