import React, { useState } from 'react'
import CryptoJS from 'crypto-js';
import axios from 'axios';

const DocumentVerificationPage = () => {
  const [file, setFile] = useState("rs");

  const verifyDocument = async () => {
    if (!file) {
      alert('Please select a file');
      return;
    }
    try {
      const hashedContent = CryptoJS.SHA256(file);
      const hash = hashedContent.toString(CryptoJS.enc.Hex);
      console.log("hash", hash)
      axios.post('http://localhost:4000/document/verify', { hash }, {
        headers: { Authorization: `${localStorage.getItem('token')}` },
      });

    } catch (error) {
      console.error('Error verifying document:', error);
    }
  };

  return (
    <div className='flex flex-col'>
      <h1 className='text-xl p-5 text-center font-bold'>Upload your document</h1>
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
  )
}

export default DocumentVerificationPage