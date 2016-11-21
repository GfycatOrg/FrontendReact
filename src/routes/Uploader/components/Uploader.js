import React from 'react'
import UploaderHeader from './UploaderHeader/UploaderHeader'

const Uploader = ({ children }) => (
  <div className="uploader-container">
    <UploaderHeader />
    {children}
  </div>
);

export default Uploader;
