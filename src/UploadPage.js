import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  height: 100vh;
  gap: 20px;
`;

const UploadButton = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const CancelButton = styled.button`
  background-color: #ff0000;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const DragAndDropArea = styled.div`
  border: 2px dashed #ccc;
  padding: 20px;
  text-align: center;
  cursor: pointer;
`;

const Form = styled.form`
  display: grid;
  gap: 10px;
`;

const SearchBar = styled.input`
  margin-left: 10px; /* Add margin to create space between StudyDome and SearchBar */
  padding: 10px;
  border: none;
  border-radius: 5px;
`;


const MainContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px;
`;

const MainSection = styled.section`
  background-color: #fff;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const SideBar = styled.aside`
  background-color: #f2f2f2;
  padding: 20px;
`;

const Message = styled.div`
  margin-top: 20px;
`;

const ErrorMessage = styled(Message)`
  color: #ff0000;
`;

const SuccessMessage = styled(Message)`
  color: #4caf50;
`;

const App = () => {
  const [uploadStatus, setUploadStatus] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [fileType, setFileType] = useState('Option 1');
  const [dragAreaText, setDragAreaText] = useState('Drag and Drop here');
  const fileInputRef = useRef(null);


  useEffect(() => {
      let interval;


      if (uploadStatus === 'uploading') {
          interval = setInterval(() => {
              if (uploadProgress < 100) {
                  setUploadProgress((prevProgress) => prevProgress + 10);
              } else {
                  clearInterval(interval);
                  simulateServerUpload()
                      .then((response) => {
                          setUploadStatus('success');
                      })
                      .catch((error) => {
                          console.error('File upload error:', error);
                          setUploadStatus('error');
                      });
              }
          }, 500);
      }


      return () => clearInterval(interval);
  }, [uploadProgress, uploadStatus]);


  const simulateServerUpload = () => {
      return new Promise((resolve, reject) => {
          setTimeout(() => {
              const success = Math.random() > 0.5;
              if (success) {
                  resolve('File uploaded successfully!');
              } else {
                  reject(new Error('File upload failed. Please try again.'));
              }
          }, 2000);
      });
  };


  const handleUpload = async () => {
      try {
          if (!file) {
              alert('Please attach a file before uploading.');
              return;
          }


          const formData = new FormData();
          formData.append('file', file);
          formData.append('title', title);
          formData.append('description', description);
          formData.append('fileType', fileType);


          setUploadStatus('uploading');


          const response = await axios.post('http://localhost:3001/upload', formData, {
              headers: {
                  'Content-Type': 'multipart/form-data',
              },
          });


          console.log(response.data);


          setUploadStatus('success');
      } catch (error) {
          console.error('Error uploading file:', error);
          setUploadStatus('error');
      }
  };


  const handleRetry = () => {
      setUploadProgress(0);
      setUploadStatus(null);
      setFile(null); // Reset the file state to null
      setTitle(''); // Reset other relevant states if needed
      setDescription('');
      setFileType('Option 1');
      setDragAreaText('Drag and Drop here');
      fileInputRef.current.value = ''; // Clear the file input
  };


  const handleDrop = (e) => {
      e.preventDefault();


      const files = e.dataTransfer.files;


      if (files.length > 0) {
          setFile(files[0]);
          setUploadStatus(null); // Reset upload status
          setDragAreaText(`File Dropped: ${files[0].name}`);
      }
  };


  return (
      <Container>        
          <MainContent>
              <MainSection>
                  <Form>
                      <label>
                          File Title:
                          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                      </label>
                      <label>
                          Description:
                          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                      </label>
                      <label>
                          File Type:
                          <select value={fileType} onChange={(e) => setFileType(e.target.value)}>
                              <option>Documents</option>
                              <option>Audio</option>
                              <option>Video</option>
                              <option>Datasets</option>
                          </select>
                      </label>


                      <label htmlFor="fileInput">
                          Browse for Files:
                          <input
                              type="file"
                              id="fileInput"
                              ref={fileInputRef}
                              onChange={(e) => setFile(e.target.files[0])}
                          />
                      </label>


                      <DragAndDropArea
                          onDragOver={(e) => e.preventDefault()}
                          onDrop={(e) => handleDrop(e)}
                      >
                          <p>{dragAreaText}</p>
                      </DragAndDropArea>
                      <CancelButton type="button" onClick={handleRetry}>
                          Cancel
                      </CancelButton>
                  </Form>
              </MainSection>


              <SideBar>
                  <UploadButton onClick={handleUpload}>Upload</UploadButton>
              </SideBar>
          </MainContent>
      </Container>
  );
};


export default App;
