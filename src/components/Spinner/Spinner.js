import React from 'react';
import style from './Spinner.scss';

const Spinner = ({
  customClass,
  visible,
  size
}) => {
  let sizeStyle = {};
  if (size) {
    sizeStyle = {
      width: `${size}px`,
      height: `${size}px`
    };
  }

  return (
    <div
      className={`${style.spinner} ${visible ? style.visible : ''} ${customClass ? customClass: ''}`}
      style={sizeStyle}
    >
      <div className={style.spinnerBlade}></div>
      <div className={style.spinnerBlade}></div>
      <div className={style.spinnerBlade}></div>
      <div className={style.spinnerBlade}></div>
      <div className={style.spinnerBlade}></div>
      <div className={style.spinnerBlade}></div>
      <div className={style.spinnerBlade}></div>
      <div className={style.spinnerBlade}></div>
      <div className={style.spinnerBlade}></div>
      <div className={style.spinnerBlade}></div>
      <div className={style.spinnerBlade}></div>
      <div className={style.spinnerBlade}></div>
    </div>
  );
};

Spinner.propTypes = {
  customClass: React.PropTypes.string,
  size: React.PropTypes.number,
  visible: React.PropTypes.bool
};

export default Spinner;
