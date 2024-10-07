import React, { useState } from 'react';
import axios from 'axios';
import generateFileHash from '../services/generateHash';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DocumentVerificationPage = () => {
  const [file, setFile] = useState(null);
  const [verificationResult, setVerificationResult] = useState(null);
  const [auditLogs, setAuditLogs] = useState([]);
  
  const notifySuccess = () => toast.success('Document is valid');
  const notifyError = () => toast.error('Document is not valid');
  const notifyNoFile = () => toast.error('Please select a file');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const verifyDocument = async () => {
    if (!file) {
      notifyNoFile();
      return;
    }
    try {
      // Generate the hash of the selected file
      const hash = await generateFileHash(file);
  
      // Send the hash to the backend for verification
      const response = await axios.post(
        'http://localhost:3000/document/verify',
        { hash },
        { headers: { Authorization: localStorage.getItem('token') } }
      );
  
      if (response.status === 200) {
        const { message, user } = response.data;
        console.log('Verification successful. User:', user);
        notifySuccess();
        setVerificationResult(user);
        fetchAuditLogs(response.data.documentId); // Pass documentId to fetchAuditLogs
      } else if (response.status === 204) {
        console.log('Document is not valid');
        setVerificationResult(null);
        setAuditLogs([]); // Clear audit logs
        notifyError();
      }
    } catch (error) {
      console.error('Error verifying document:', error);
    }
  };

  const fetchAuditLogs = async (documentId) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/document/audit-logs/${documentId}`,
        { headers: { Authorization: localStorage.getItem('token') } }
      );
      setAuditLogs(response.data);
    } catch (error) {
      console.error('Error fetching audit logs:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Verify Your Document</h1>
      <div className="flex flex-col items-center bg-white p-10 rounded-lg shadow-lg">
        <input
          type="file"
          onChange={handleFileChange}
          className="border border-gray-300 rounded p-2"
        />
        {file && (
          <p className="mt-4 text-green-500">
            Selected file: {file.name}
          </p>
        )}
        <button
          onClick={verifyDocument}
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-300"
        >
          Verify Document
        </button>
      </div>
      {verificationResult && (
        <div className="mt-8 p-4 bg-green-100 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Associated User:</h2>
          <p>Email: {verificationResult.email}</p>
          <p>Username: {verificationResult.username}</p>
        </div>
      )}
      {auditLogs.length > 0 && (
        <div className="mt-8 p-4 bg-gray-100 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Audit Logs:</h2>
          {auditLogs.map((log) => (
            <div key={log._id} className="border-b border-gray-300 mb-2 pb-2">
              <p><strong>Action:</strong> {log.action}</p>
              <p><strong>User:</strong> {log.userId.username} ({log.userId.email})</p>
              <p><strong>Description:</strong> {log.description}</p>
              <p><strong>Timestamp:</strong> {new Date(log.timestamp).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default DocumentVerificationPage;
