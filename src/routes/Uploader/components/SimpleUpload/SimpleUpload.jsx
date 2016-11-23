import React from 'react';
import 'styles/variables.scss';
import './SimpleUpload.scss';
import FileDragAndDrop from 'components/FileDragAndDrop/FileDragAndDropContainer';
import FileUpload from '../FileUpload/FileUploadContainer';
import PasteUrl from '../PasteUrl/PasteUrlContainer';

class SimpleUpload extends React.Component {

  render() {
    return (
      <div className="simple-upload-container">
        <FileDragAndDrop>
          <PasteUrl />
          <FileUpload />
        </FileDragAndDrop>
      </div>
    );
  }
}

export default SimpleUpload;
