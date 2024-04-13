import { useStorageUpload } from "@thirdweb-dev/react";
import React, { useState } from "react";

const ipfsService = () => {
  const [file, setFile] = useState(null);
  const { mutateAsync: upload } = useStorageUpload();

  const uploadToIpfs = async () => {
    const uploadUrl = await upload({
      data: [file],
      options: {
        uploadWithGatewayUrl: true,
        uploadWithoutDirectory: true,
      },
    });

    console.log("Upload Url: ", uploadUrl);
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

export default ipfsService;
