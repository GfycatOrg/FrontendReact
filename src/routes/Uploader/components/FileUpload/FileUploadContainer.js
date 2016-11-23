import { connect } from 'react-redux';
import { newFilesChosen } from 'actions/fileUpload';
import FileUpload from './FileUpload';


const mapStateToProps = state => ({
  active: state.simpleupload.dropAreaActive
});


const mapDispatchToProps = dispatch => ({
  onChange: (event) => {
    if (event.target.files.length) {
      dispatch(newFilesChosen(event.target.files));
    }
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(FileUpload);
