import React, { useState, useEffect } from 'react';
import axios from 'axios';
import downloadDocumentFromPinata from '../services/DownloadDocumentFromPinata';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Import images
import aadharImage from '../assets/aadhar.png';
import panImage from '../assets/pan.png';
import drivingLicenseImage from '../assets/license.png';
import passportImage from '../assets/passport.webp';

const StoragePage = () => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    // Fetch user's documents from the server
    const fetchDocuments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/document/document",
          {
            headers: { Authorization: `${localStorage.getItem("token")}` },
          }
        );
        setDocuments(response.data);
      } catch (error) {
        console.error('Error fetching documents:', error);
        toast.error('Error fetching documents');
      }
    };

    fetchDocuments();
  }, []);

  const handleDownloadClick = (document) => {
    const pinataHash = document.ipfsUrl;
    console.log(pinataHash);
    downloadDocumentFromPinata(pinataHash);
  };

  const getDocumentImage = (type) => {
    switch (type) {
      case 'Aadhaar':
        return aadharImage;
      case 'PAN':
        return panImage;
      case 'Driving Licence':
        return drivingLicenseImage;
      case 'Passport':
        return passportImage;
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 animate-fade-in">Your Documents</h1>

      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
        {documents.map((document) => (
          <div key={document.id} className="relative flex flex-col rounded-xl bg-white text-gray-700 shadow-lg p-6 transition transform hover:-translate-y-1 hover:shadow-xl duration-300 animate-fade-in-up">
            <div className="relative h-48 overflow-hidden rounded-xl bg-gray-100 shadow-lg">
              <img
                src={getDocumentImage(document.type)}
                alt="document-thumbnail"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="text-center p-6">
              <h4 className="mb-2 text-xl font-semibold leading-snug tracking-normal text-gray-900">
                {document.type}
              </h4>
              <div className="flex justify-center items-center text-base font-medium leading-relaxed text-gray-600">
                {document.hash.substring(0, 5)}...
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(document.hash);
                    toast.success('Hash copied to clipboard');
                  }}
                  className="ml-2 text-blue-600 hover:text-blue-800"
                  title="Copy to clipboard"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7H5a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-3m-4-10h5a2 2 0 012 2v5a2 2 0 01-2 2h-5a2 2 0 01-2-2V5a2 2 0 012-2z"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="flex justify-center gap-4 p-6 pt-2">
              <a
                href={document.ipfsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800"
              >
                View
              </a>
              <a
                href="#"
                onClick={() => handleDownloadClick(document)}
                className="text-blue-600 hover:text-blue-800"
              >
                Download
              </a>
            </div>
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default StoragePage;
