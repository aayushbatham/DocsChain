import { useStorageUpload } from "@thirdweb-dev/react";
import React, { useState } from "react";
import axios from "axios";

const IpfsService = () => {
  const [file, setFile] = useState(null);
  const { mutateAsync: upload } = useStorageUpload();

  const uploadToIpfs = async () => {
    if (!file) {
      console.error("No file selected");
      return;
    }

    try {
      // Get the authentication token from local storage or cookies
      const authToken = document.cookie.replace(/(?:(?:^|.*;\s*)jwtToken\s*=\s*([^;]*).*$)|^.*$/, "$1");
      // Include the authentication token in the request headers
      const headers = {
        Authorization: `${authToken}`,
      };

      // Upload the file to IPFS
      const uploadResponse = await upload({
        data: [file],
        options: {
          uploadWithGatewayUrl: true,
          uploadWithoutDirectory: true,
        },
      });

      // Extract the IPFS URL from the response
      const ipfsUrl = uploadResponse;

      // Associate the uploaded document with the user on the backend
      await axios.post("http://localhost:4000/document/document", { ipfsUrl }, { headers });

      console.log("Document uploaded to IPFS and associated with user", ipfsUrl);
    } catch (error) {
      console.error("Error uploading document to IPFS:", error);
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
      <button onClick={uploadToIpfs}>Upload</button>
    </div>
  );
};

export default IpfsService;
