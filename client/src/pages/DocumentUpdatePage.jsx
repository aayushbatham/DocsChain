import React, { useState, useEffect } from "react";
import axios from "axios";
import generateFileHash from "../services/generateHash";
import { ToastContainer, toast } from "react-toastify";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "react-toastify/dist/ReactToastify.css";
import "animate.css";

const DocumentUpdatePage = () => {
  const [documents, setDocuments] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState('');
  const [file, setFile] = useState(null);
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [auditLogs, setAuditLogs] = useState([]);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await axios.get('http://localhost:3000/document/document', {
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
      const hash = await generateFileHash(file);
      console.log("hash", hash);

      const ipfsUrl = await uploadToIPFS(file);
      console.log('IPFS URL:', ipfsUrl);

      const response = await axios.put(
        'http://localhost:3000/document/update',
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
        fetchAuditLogs(selectedDocument); 
      }
    } catch (error) {
      console.error('Error updating document:', error);
      toast.error("Error updating document");
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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center animate__animated animate__fadeIn">Update Document</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 animate__animated animate__fadeInUp">
        <div>
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
        <div>
          <label className="block text-gray-700">Upload New File</label>
          <input
            type="file"
            className="border rounded w-full py-2 px-3"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <div>
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
        <div className="col-span-full">
          <label className="block text-gray-700">Description</label>
          <textarea
            className="border rounded w-full py-2 px-3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
      </div>
      <button
        onClick={handleUpdate}
        className="bg-blue-500 text-white p-3 rounded w-full hover:bg-blue-600 transition-colors duration-300 mt-4 animate__animated animate__fadeInUp"
      >
        Update Document
      </button>

      <h2 className="text-xl font-bold mt-8 text-center animate__animated animate__fadeIn">Audit Logs</h2>
      <div className="mt-4">
        <TransitionGroup>
          {auditLogs.length > 0 ? (
            auditLogs.map((log) => (
              <CSSTransition key={log._id} timeout={500} classNames="fade">
                <div className="border rounded p-4 mb-4 animate__animated animate__fadeIn">
                  <p><strong>Action:</strong> {log.action}</p>
                  <p><strong>User:</strong> {log.userId.username} ({log.userId.email})</p>
                  <p><strong>Description:</strong> {log.description}</p>
                  <p><strong>Timestamp:</strong> {new Date(log.timestamp).toLocaleString()}</p>
                </div>
              </CSSTransition>
            ))
          ) : (
            <p className="text-center">No audit logs found.</p>
          )}
        </TransitionGroup>
      </div>
      <ToastContainer />
    </div>
  );
};

export default DocumentUpdatePage;
