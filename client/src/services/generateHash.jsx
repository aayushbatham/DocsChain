import CryptoJS from 'crypto-js';

const generateFileHash = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const fileContent = reader.result;
      const hashedContent = CryptoJS.SHA256(fileContent);
      const hexHash = hashedContent.toString(CryptoJS.enc.Hex);
      resolve(hexHash);
    };
    reader.onerror = reject;
    reader.readAsBinaryString(file);
  });
};

export default generateFileHash;