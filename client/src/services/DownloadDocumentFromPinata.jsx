import React from 'react';

const downloadDocumentFromPinata = async (pinataUrl) => {
  try {
    // Fetch the file from the IPFS gateway
    const response = await fetch(pinataUrl);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    // Convert the response to a Blob (binary data)
    const blob = await response.blob();

    // Create a link element to download the file
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;

    // Extract file name from the URL (or set it manually)
    const filename = pinataUrl.split('/').pop() || 'downloaded-file';
    link.download = filename; // Set the download attribute to the file name

    // Append link to the body, click to trigger download, and remove it after
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Clean up the object URL
    window.URL.revokeObjectURL(url);
    
    console.log('File downloaded successfully!');
  } catch (error) {
    console.error('Error downloading document:', error);
  }
};

export default downloadDocumentFromPinata;
