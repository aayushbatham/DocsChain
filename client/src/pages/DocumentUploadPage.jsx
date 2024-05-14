import React from 'react'
import UploadtoIpfs from '../services/ipfsService'

const DocumentUploadPage = () => {
  return (
    <div className='flex flex-col'>
      <h1 className='text-xl p-5 text-center font-bold'>Upload your document</h1>
      <div className='flex justify-center'>
        <div>
        <UploadtoIpfs/>
        </div>
      </div>
    </div>
  )
}

export default DocumentUploadPage