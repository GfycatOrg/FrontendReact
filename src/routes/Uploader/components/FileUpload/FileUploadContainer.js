import { connect } from 'react-redux'
import FileUpload from './FileUpload'


const mapStateToProps = (state) => ({
  active: state.simpleupload.dropAreaActive
});


const mapDispatchToProps = (
  dispatch
) => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FileUpload)
