import { connect } from 'react-redux';
import FileDragAndDrop from './FileDragAndDrop';
import { dropAreaActive, newFilesChosen } from 'actions/fileUpload';

// propTypes: {
//   onDragStart: React.PropTypes.func,
//   onDrop: React.PropTypes.func.isRequired,
//   onDragEnter: React.PropTypes.func,
//   onDragLeave: React.PropTypes.func,
//   onDragOver: React.PropTypes.func,
//   onDragEnd: React.PropTypes.func
// }

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (
  dispatch
) => {
  return {
    onDragStart: (event) => {
      console.log('handleDragStart');
    },

    onDrag: (event) => {
      console.log('handleDrag');
    },

    onDragEnter: (event) => {
      dispatch(dropAreaActive(true));
      console.log('handleDragEnter');
    },

    onDragLeave: (event) => {
      console.log('handleDragLeave');
      dispatch(dropAreaActive(false));
    },

    onDragOver: (event) => {
      //console.log('handleDragOver');
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
      //console.log('handleDragEnd');
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FileDragAndDrop);
