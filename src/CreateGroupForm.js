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

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  resize: vertical;
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

const SuccessMessage = styled.div`
  color: #4caf50;
  margin-top: 10px;
`;

const ErrorMessage = styled.div`
  color: #ff0000;
  margin-top: 10px;
`;

const CreateGroupForm = () => {
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');
  const [groupPassword, setGroupPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleCreateGroup = async () => {
    try {
      // Perform validation here (e.g., check if required fields are filled)
      if (!groupName) {
        throw new Error('Group name is required.');
      }

      // Make a POST request to your API to create the group
      const response = await fetch('http://localhost:3001/api/create-group', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: groupName, description: groupDescription, password: groupPassword }),
      });

      if (response.ok) {
        // Group created successfully
        setSuccessMessage('Group created successfully.');
        setGroupName(''); // Clear the form fields
        setGroupDescription('');
        setGroupPassword('');
      } else {
        // Handle the error response
        setErrorMessage('Error creating group.');
      }
    } catch (error) {
      console.error('Error creating group:', error);
      setErrorMessage('Error creating group.');
    }
  };

  return (
    <FormContainer>
      <h2>Create a Group</h2>
      <form>
        <FormGroup>
          <FormLabel>Name:</FormLabel>
          <FormInput
            type="text"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>Description:</FormLabel>
          <FormTextarea
            value={groupDescription}
            onChange={(e) => setGroupDescription(e.target.value)}
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
        <FormButton type="button" onClick={handleCreateGroup}>
          Create Group
        </FormButton>
        {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </form>
    </FormContainer>
  );
};

export default CreateGroupForm;
