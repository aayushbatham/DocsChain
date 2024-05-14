import React, { useState, useEffect } from 'react';
import axios from 'axios';
import downloadDocumentFromPinata from '../services/DownloadDocumentFromPinata';

const StoragePage = () => {
  const [documents, setDocuments] = useState([]);
  

  useEffect(() => {
    // Fetch user's documents from the server
    const fetchDocuments = async () => {
      try {
        const response = await axios.get(
            "http://localhost:4000/document/documents",
            {
              headers: { Authorization: `${localStorage.getItem("token")}` },
            }
          );
        setDocuments(response.data);
      } catch (error) {
        console.error('Error fetching documents:', error);
      }
    };

    fetchDocuments();
    
  }, []);
  const handleDownloadClick = (document) => {
    const pinataHash = document.ipfsUrl
    console.log(pinataHash)
    downloadDocumentFromPinata(pinataHash);
    
  };

  const downloadDocument = (documentId) => {
    // Implement download functionality
    // You can use a backend endpoint to fetch the document and initiate the download
    console.log('Downloading document with ID:', documentId);
  };

  return (
    <div>
      <h1 className='font-bold text-xl py-5'>Your Documents</h1>
      <table>
        <thead>
          <tr>
            <th className='px-5 py-5'>Name</th>
            <th className='px-5'>Hash</th>
            <th className='px-5'>Action</th>
          </tr>
        </thead>
        <tbody>
          {documents.map((document) => (
            <tr className='px-5' key={document.id}>
              <td className='px-5' >{document.type}</td>
              <td className='px-5' >{document.hash}</td>
              <td>
                <a href={document.ipfsUrl} target="_blank" rel="noopener noreferrer" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">View</a>
              </td>
              <td>
              <a href='#' onClick={() => handleDownloadClick(document)} rel="noopener noreferrer" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Download</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StoragePage;
