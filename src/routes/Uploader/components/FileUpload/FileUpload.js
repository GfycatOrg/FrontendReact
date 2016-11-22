import React from 'react';
import './FileUpload.scss';

const FileUpload = ({
  active
}) => (
  <div className={"file-upload-container" + (active ? " active" : "")}>
    <div className="file-upload">
      <i className="ic ic-cloud-upload ic-cloud-upload--blue"></i>
      <p className="choose-files-text">Choose files to upload</p>
      <p className="grag-and-grop-text">or drag and drop files here</p>
      <input className="file-input" type="file" name="file"
        accept="video/*,video/mp4,video/x-m4v,video/*,image/gif" />
    </div>
  </div>
);

export default FileUpload;
