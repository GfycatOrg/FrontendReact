import React from 'react';
import './Spinner.scss';

const Spinner = ({
  customClass,
  visible,
  size
}) => {
  let spinnerClass = "spinner";
  if (visible) spinnerClass += " visible";
  if (customClass) spinnerClass += (" " + customClass);

  let style = {};
  if (size) {
    style = {
      width: size + "px",
      height: size + "px"
    };
  }

  return (
    <div className={spinnerClass} style={style}>
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

export default Spinner;
