import React from 'react';
import 'styles/variables.scss';
import FileDragAndDrop from 'components/FileDragAndDrop/FileDragAndDropContainer';

import './SimpleUpload.scss';
import FileUpload from '../FileUpload/FileUploadContainer';
import PasteUrl from '../PasteUrl/PasteUrlContainer';

const SimpleUpload = () => (
  <div className="simple-upload-container">
    <FileDragAndDrop>
      <PasteUrl />
      <FileUpload />
    </FileDragAndDrop>
  </div>
);


export default SimpleUpload;
