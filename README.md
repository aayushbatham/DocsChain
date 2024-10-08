# Docs chain - Document Update, and Storage System using IPFS.

Docs chain is a document management system built with the MERN stack (MongoDB, Express.js, React, Node.js) and utilizes IPFS (InterPlanetary File System) for decentralized storage and retrieval of documents. Pinata is used as the IPFS service provider for pinning files.

## Features

- **Document Verification:** Securely verify the authenticity and integrity of documents using cryptographic hashing techniques.
- **Document Update:** Easily update documents while maintaining a transparent and immutable record of changes.
- **Decentralized Storage:** Utilize IPFS for decentralized and censorship-resistant storage of documents.
- **User Authentication:** Authenticate users securely and manage access to documents based on user roles and permissions.

## Screenshots

![Landing Page](https://raw.githubusercontent.com/aayushbatham/DocsChain/main/assets/Landing.png)

![Dashboard](https://raw.githubusercontent.com/aayushbatham/DocsChain/main/assets/Home.png)
*Dashboard where all your documents are present which are securely stored in an IPFS decentralized storage*

## Technologies Used

- **MERN Stack:**
  - MongoDB: NoSQL database for storing document metadata and user information.
  - Express.js: Backend framework for building RESTful APIs to interact with the database.
  - React: Frontend library for building the user interface.
  - Node.js: JavaScript runtime environment for running server-side code.

- **IPFS (InterPlanetary File System):** Decentralized peer-to-peer protocol for storing and sharing hypermedia content.
- **Pinata:** IPFS service provider for pinning files and ensuring high availability.

## Installation

1. Clone the repository:

   ```bash
   git clone <repository_url>
   ```

2. Navigate to the project directory:

   ```bash
   cd <repo_name>
   ```

3. Install dependencies for the backend and frontend:

   ```bash
   npm install
   cd client
   npm install
   ```

4. Configure environment variables:

   Create a `.env` file in the root directory and add the following variables:
   server (.env)
   ```plaintext
   PORT = 
   SECRET = ""
   MONGO_URI = ""
   clientOrigin = ""
   ```
   client (.env)
   ```plaintext
   VITE_PINATA_JWT=""
   VITE_PINATA_SECERET = ""
   VITE_DEPLOYMENT_URL = ""
   ```
   **You can create your own pinata storage at https://pinata.cloud/**
6. Start the development server:

   ```bash
   npm run dev
   ```

7. Access the application at `http://import.meta.env.VITE_DEPLOYMENT_URL`.

## Usage

1. Register a new account or log in if you already have an account.
2. Upload documents to the platform.
3. Verify, update, or delete documents as needed.
4. Access your documents securely anytime from anywhere.

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests to improve the project.

## License

This project is licensed under the [MIT License](LICENSE).
