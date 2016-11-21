var React = require('react');

var style = {
  width: '100%',
  height: '100%'
};

var FileDragAndDrop = React.createClass({

  propTypes: {
    onDragStart: React.PropTypes.func,
    onDrop: React.PropTypes.func.isRequired,
    onDragEnter: React.PropTypes.func,
    onDragLeave: React.PropTypes.func,
    onDragOver: React.PropTypes.func,
    onDragEnd: React.PropTypes.func
  },

  handleDragStart: function (event) {
    console.log('handleDragStart');
    if (typeof this.props.onDragStart === 'function') {
      this.props.onDragStart(event);
    }
  },

  handleDrag: function (event) {
    console.log('handleDrag');
    if (typeof this.props.onDrag === 'function') {
      this.props.onDrag(event);
    }
  },

  handleDragEnter: function (event) {
    console.log('handleDragEnter');
    if (typeof this.props.onDragEnter === 'function') {
      this.props.onDragEnter(event);
    }
  },

  handleDragLeave: function (event) {
    console.log('handleDragLeave');
    if (typeof this.props.onDragLeave === 'function') {
      this.props.onDragLeave(event);
    }
  },

  handleDragOver: function (event) {
    console.log('handleDragOver');
    event.preventDefault();

    if (typeof this.props.onDragOver === 'function') {
      this.props.onDragOver(event);
    }
  },

  handleDrop: function (event) {
    console.log('handleDrop');
    //event.preventDefault();
    event.stopPropagation();

    console.log(event.dataTransfer.files);

    if (event.dataTransfer.files.length > 0) {
      if (typeof this.props.onDrop === 'function') {
        this.props.onDrop(event.dataTransfer);
      }
    }
  },

  handleDragEnd: function (event) {
    console.log('handleDragEnd');
    if (typeof this.props.onDragEnd === 'function') {
      this.props.onDragEnd(event);
    }
  },

  render: function () {
    return (
      <div
        onDragStart={this.handleDragStart}
        onDrag={this.handleDrag}
        onDragEnter={this.handleDragEnter}
        onDragLeave={this.handleDragLeave}
        onDragOver={this.handleDragOver}
        onDrop={this.handleDrop}
        onDragEnd={this.handleDragEnd}
        style={style}>

        {this.props.children}

      </div>
    );
  }
});

module.exports = FileDragAndDrop;
