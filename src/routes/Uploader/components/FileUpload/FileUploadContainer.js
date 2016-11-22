import { connect } from 'react-redux';
import FileUpload from './FileUpload';
import { newFilesChosen } from 'actions/fileUpload';


const mapStateToProps = (state) => ({
  active: state.simpleupload.dropAreaActive
});


const mapDispatchToProps = (
  dispatch
) => {
  return {
    onChange: (event) => {
      if (event.target.files.length) {
        dispatch(newFilesChosen(event.target.files));
      }
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FileUpload);
