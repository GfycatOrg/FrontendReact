var React = require('react');

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

export default FileDragAndDrop;
