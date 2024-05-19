import React, { useState, useEffect } from "react";
import axios from "axios";
import generateFileHash from "../services/generateHash";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DocumentUpdatePage = () => {
  const [documents, setDocuments] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState('');
  const [file, setFile] = useState(null);
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [auditLogs, setAuditLogs] = useState([]);

  useEffect(() => {
    // Fetch user's documents on component mount
    const fetchDocuments = async () => {
      try {
        const response = await axios.get('http://localhost:4000/document/document', {
          headers: { Authorization: localStorage.getItem('token') }
        });
        setDocuments(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching documents:', error);
      }
    };

    fetchDocuments();
  }, []);

  const uploadToIPFS = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const metadata = JSON.stringify({ name: type });
    formData.append("pinataMetadata", metadata);
    const options = JSON.stringify({ cidVersion: 0 });
    formData.append("pinataOptions", options);

    const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_PINATA_JWT}`,
      },
      body: formData,
    });

    const resData = await res.json();
    return `https://gateway.pinata.cloud/ipfs/${resData.IpfsHash}`;
  };

  const handleUpdate = async () => {
    if (!selectedDocument || !file || !description || !type) {
      toast.error("Please select a document, upload a file, add a description, and specify a type.");
      return;
    }

    try {
      // Generate the hash of the selected file
      const hash = await generateFileHash(file);
      console.log("hash", hash);

      // Upload file to IPFS
      const ipfsUrl = await uploadToIPFS(file);
      console.log('IPFS URL:', ipfsUrl);

      // Send the update request to the backend
      const response = await axios.put(
        'http://localhost:4000/document/update',
        {
          documentId: selectedDocument,
          type: type,
          ipfsUrl: ipfsUrl,
          description: description,
          hash: hash,
        },
        { headers: { Authorization: localStorage.getItem('token') } }
      );

      if (response.status === 200) {
        toast.success('Document updated successfully');
        fetchAuditLogs(selectedDocument); // Fetch audit logs after successful update
      }
    } catch (error) {
      console.error('Error updating document:', error);
      toast.error("Error updating document");
    }
  };

  const fetchAuditLogs = async (documentId) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/document/audit-logs/${documentId}`,
        { headers: { Authorization: localStorage.getItem('token') } }
      );
      setAuditLogs(response.data);
    } catch (error) {
      console.error('Error fetching audit logs:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Update Document</h1>
      <div className="mb-4">
        <label className="block text-gray-700">Select Document</label>
        <select
          className="border rounded w-full py-2 px-3"
          value={selectedDocument}
          onChange={(e) => setSelectedDocument(e.target.value)}
        >
          <option value="">Select a document</option>
          {documents.map((doc) => (
            <option key={doc._id} value={doc._id}>
              {doc.type} - {doc.hash}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Upload New File</label>
        <input
          type="file"
          className="border rounded w-full py-2 px-3"
          onChange={(e) => setFile(e.target.files[0])}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Type</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="mb-4 p-3 border rounded w-full"
        >
          <option value="">Select Document Type</option>
          <option value="Aadhaar">Aadhaar</option>
          <option value="PAN">PAN</option>
          <option value="Passport">Passport</option>
          <option value="Driving Licence">Driving Licence</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Description</label>
        <textarea
          className="border rounded w-full py-2 px-3"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>
      <button
        onClick={handleUpdate}
        className="bg-blue-500 text-white p-3 rounded w-full hover:bg-blue-600 transition-colors duration-300"
      >
        Update Document
      </button>

      <h2 className="text-lg font-bold mt-8">Audit Logs</h2>
      <div className="mt-4">
        {auditLogs.length > 0 ? (
          auditLogs.map((log) => (
            <div key={log._id} className="border rounded p-4 mb-4">
              <p><strong>Action:</strong> {log.action}</p>
              <p><strong>User:</strong> {log.userId.username} ({log.userId.email})</p>
              <p><strong>Description:</strong> {log.description}</p>
              <p><strong>Timestamp:</strong> {new Date(log.timestamp).toLocaleString()}</p>
            </div>
          ))
        ) : (
          <p>No audit logs found.</p>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default DocumentUpdatePage;
