import React, { useState } from "react";
import axios from "axios";
import generateFileHash from "../services/generateHash";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const IpfsService = () => {
  const [file, setFile] = useState(null);
  const [type, setType] = useState(""); // State to store the selected document type

  const uploadToIpfs = async () => {
    if (!file || !type) {
      toast.error("Please select a file or specify a type");
      return;
    }
    try {
      const hash = await generateFileHash(file);

      // Check if the document already exists in the backend database
      const checkResponse = await axios.get(
        `http://localhost:3000/document/check/${hash}`,
        {
          headers: { Authorization: `${localStorage.getItem("token")}` },
        }
      );

      if (checkResponse.data.exists) {
        toast.warn("Document is already associated with the user!");
        return;
      }

      // Proceed with uploading the file to Pinata
      const formData = new FormData();
      formData.append("file", file);
      const metadata = JSON.stringify({
        name: type,
      });
      formData.append("pinataMetadata", metadata);
      const options = JSON.stringify({
        cidVersion: 0,
      });
      formData.append("pinataOptions", options);

      const res = await fetch(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_PINATA_JWT}`,
          },
          body: formData,
        }
      );

      const resData = await res.json();
      const ipfsUrl = `https://gateway.pinata.cloud/ipfs/${resData.IpfsHash}`;

      await axios.post(
        "http://localhost:3000/document/document",
        { ipfsUrl, type, hash, userId: localStorage.getItem("userId") },
        {
          headers: { Authorization: `${localStorage.getItem("token")}` },
        }
      );

      toast.success("Document uploaded successfully!");
    } catch (error) {
      console.error("Error uploading to IPFS:", error);
      toast.error("Error uploading document");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg animate-fade-in">
        <h2 className="text-3xl font-bold mb-6 text-gray-900 text-center">Upload Document to IPFS</h2>
        <input
          type="file"
          onChange={(e) => {
            if (e.target.files) {
              setFile(e.target.files[0]);
            }
          }}
          className="mb-4 p-3 border rounded w-full"
        />
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
        <button
          onClick={uploadToIpfs}
          className="bg-blue-500 text-white p-3 rounded w-full hover:bg-blue-600 transition-colors duration-300"
        >
          Upload
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default IpfsService;
