import { connect } from 'react-redux';
import { dropAreaActive, newFilesChosen } from 'actions/fileUpload';
import FileDragAndDrop from './FileDragAndDrop';

// propTypes: {
//   onDragStart: React.PropTypes.func,
//   onDrop: React.PropTypes.func.isRequired,
//   onDragEnter: React.PropTypes.func,
//   onDragLeave: React.PropTypes.func,
//   onDragOver: React.PropTypes.func,
//   onDragEnd: React.PropTypes.func
// }

// const mapStateToProps = state => ({
//
// });

const mapDispatchToProps = dispatch => ({
  onDragStart: (event) => {
    console.log('handleDragStart', event);
  },

  onDrag: (event) => {
    console.log('handleDrag', event);
  },

  onDragEnter: (event) => {
    dispatch(dropAreaActive(true));
    console.log('handleDragEnter', event);
  },

  onDragLeave: (event) => {
    console.log('handleDragLeave', event);
    dispatch(dropAreaActive(false));
  },

  onDragOver: (event) => {
      // console.log('handleDragOver');
    event.preventDefault();
  },

  onDrop: (event) => {
    console.log('handleDrop');
    event.stopPropagation();

    if (event.dataTransfer.files.length > 0) {
      dispatch(newFilesChosen(event.dataTransfer.files));
    }
    dispatch(dropAreaActive(false));
  },

  onDragEnd: (event) => {
    console.log('handleDragEnd', event);
  }
});

export default connect(mapDispatchToProps)(FileDragAndDrop);
