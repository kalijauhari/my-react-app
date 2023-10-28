// JoinGroupForm.js
import React, { useState } from 'react';
import styled from 'styled-components';

const FormContainer = styled.div`
  width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

const FormButton = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
`;

const JoinGroupForm = () => {
  const [groupName, setGroupName] = useState('');
  const [groupPassword, setGroupPassword] = useState('');

  const handleJoinGroup = () => {
    // Implement the logic to join a group with the provided data
    console.log('Joining the group with the following data:');
    console.log('Group Name:', groupName);
    console.log('Password:', groupPassword);
  };

  return (
    <FormContainer>
      <h2>Join a Group</h2>
      <form>
        <FormGroup>
          <FormLabel>Group Name:</FormLabel>
          <FormInput
            type="text"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>Password:</FormLabel>
          <FormInput
            type="password"
            value={groupPassword}
            onChange={(e) => setGroupPassword(e.target.value)}
          />
        </FormGroup>
        <FormButton type="button" onClick={handleJoinGroup}>
          Join Group
        </FormButton>
      </form>
    </FormContainer>
  );
};

export default JoinGroupForm;
