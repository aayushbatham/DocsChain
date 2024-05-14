import React, { useState } from 'react';
import axios from 'axios';
import generateFileHash from '../services/generateHash';

const DocumentVerificationPage = () => {
  const [file, setFile] = useState(null);

  const verifyDocument = async () => {
    if (!file) {
      alert('Please select a file');
      return;
    }
    try {
      // Generate the hash of the selected file
      const hash = await generateFileHash(file);
      console.log("hash", hash);

      // Send the hash to the backend for verification
      const response = await axios.post(
        'http://localhost:4000/document/verify',
        { hash },
        { headers: { Authorization: localStorage.getItem('token') } }
      );

      console.log('Verification response:', response.data);
    } catch (error) {
      console.error('Error verifying document:', error);
    }
  };

  return (
    <div className='flex flex-col'>
      <h1 className='text-xl p-5 text-center font-bold'>Verify your document</h1>
      <div className='flex justify-center'>
        <input
          type="file"
          onChange={(e) => {
            if (e.target.files) {
              setFile(e.target.files[0]);
            }
          }}
        />
        <button onClick={verifyDocument}>Verify Document</button>
      </div>
    </div>
  );
};

export default DocumentVerificationPage;
