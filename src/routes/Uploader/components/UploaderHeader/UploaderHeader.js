import React from 'react'
import { IndexLink, Link } from 'react-router'
import './UploaderHeader.scss'

const UploaderHeader = () => (
  <div className="uploader-tabs">
    <Link to='/upload' activeClassName='active'>
      <div className="tab">Upload</div>
    </Link>
    <Link to='/editor' activeClassName='active'>
      <div className="tab">GIF Editor</div>
    </Link>
  </div>
);

export default UploaderHeader;
