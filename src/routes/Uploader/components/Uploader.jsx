import React from 'react';
import UploaderHeader from './UploaderHeader/UploaderHeader';

const Uploader = ({ children }) => (
  <div className="uploader-container">
    <UploaderHeader />
    {children}
  </div>
);

Uploader.propTypes = {
  children: React.PropTypes.element
};

export default Uploader;
