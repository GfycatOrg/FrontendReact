import React from 'react';
import './Spinner.scss';

const Spinner = ({
  customClass,
  visible,
  size
}) => {
  let style = {};
  if (size) {
    style = {
      width: `${size}px`,
      height: `${size}px`
    };
  }

  return (
    <div
      className={`spinner${visible ? ' visible' : ''}${customClass ? ` ${customClass}` : ''}`}
      style={style}
    >
      <div className="spinner-blade"></div>
      <div className="spinner-blade"></div>
      <div className="spinner-blade"></div>
      <div className="spinner-blade"></div>
      <div className="spinner-blade"></div>
      <div className="spinner-blade"></div>
      <div className="spinner-blade"></div>
      <div className="spinner-blade"></div>
      <div className="spinner-blade"></div>
      <div className="spinner-blade"></div>
      <div className="spinner-blade"></div>
      <div className="spinner-blade"></div>
    </div>
  );
};

Spinner.propTypes = {
  customClass: React.PropTypes.string,
  size: React.PropTypes.number,
  visible: React.PropTypes.bool
};

export default Spinner;
