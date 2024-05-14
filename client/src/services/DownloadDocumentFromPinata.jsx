import axios from 'axios';

const downloadDocumentFromPinata = async (pinataHash) => {
  try {

    // Extract IPFS hash from Pinata metadata
    const response = pinataHash;

    // Create a Blob from the response data
    const blob = new Blob([response.data]);

    // Create an object URL from the Blob
    const url = window.URL.createObjectURL(blob);

    // Create a hidden anchor element
    const link = document.createElement('a');
    link.href = url;
    link.download = ''; // Set the filename here
    document.body.appendChild(link);

    // Simulate a click on the anchor element to trigger the download
    link.click();

    // Remove the anchor element from the DOM
    document.body.removeChild(link);
  } catch (error) {
    console.error('Error downloading document:', error);
  }
};

export default downloadDocumentFromPinata;
