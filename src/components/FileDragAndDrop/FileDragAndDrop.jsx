import React from 'react';

const FileDragAndDrop = ({
  onDragStart,
  onDrag,
  onDragEnter,
  onDragLeave,
  onDragOver,
  onDrop,
  onDragEnd,
  children
}) => (
  <div
    className="file-drag-and-drop"
    onDragStart={event => onDragStart(event)}
    onDrag={event => onDrag(event)}
    onDragEnter={event => onDragEnter(event)}
    onDragLeave={event => onDragLeave(event)}
    onDragOver={event => onDragOver(event)}
    onDrop={event => onDrop(event)}
    onDragEnd={event => onDragEnd(event)}
  >
    {children}
  </div>
);

FileDragAndDrop.propTypes = {
  onDragStart: React.PropTypes.func,
  onDrag: React.PropTypes.func,
  onDragEnter: React.PropTypes.func,
  onDragLeave: React.PropTypes.func,
  onDragOver: React.PropTypes.func,
  onDrop: React.PropTypes.func,
  onDragEnd: React.PropTypes.func,
  children: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.element
  ])
};

export default FileDragAndDrop;
