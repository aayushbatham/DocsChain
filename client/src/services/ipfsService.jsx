import React, { useState } from "react";
import axios from "axios";
import CryptoJS from 'crypto-js';

const IpfsService = () => {
  const [file, setFile] = useState(null);
  const [type, setType] = useState(""); // State to store the selected document type

  const uploadToIpfs = async () => {
    if(!file || !type) {
      alert('Please select a file or specify a type');
      return;
    }
    try {
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
      // console.log(resData);
      const hashedContent = CryptoJS.SHA256(file);
      const hash = hashedContent.toString(CryptoJS.enc.Hex);
      console.log(hash);
      // const hash = resData.IpfsHash;
      const docType = type;
      const ipfsUrl = `https://gateway.pinata.cloud/ipfs/${resData.IpfsHash}`;
      console.log(ipfsUrl, hash, docType);
      const response = await axios.post(
        "http://localhost:4000/document/document",
        { ipfsUrl, type, hash },
        {
          headers: { Authorization: `${localStorage.getItem("token")}` },
        }
      );
    }
    catch(error) {
      console.error('Error uploading to IPFS:', error);
    }
   
  };

  return (
    <div>
      <input
        type="file"
        onChange={(e) => {
          if (e.target.files) {
            setFile(e.target.files[0]);
          }
        }}
      />
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
      >
        <option value="">Select Document Type</option>
        <option value="Aadhaar">Aadhaar</option>
        <option value="PAN">PAN</option>
        <option value="Passport">Passport</option>
        <option value="Driving Licence">Driving Licence</option>
      </select>
      <button onClick={uploadToIpfs}>Upload</button>
    </div>
  );
};

export default IpfsService;
