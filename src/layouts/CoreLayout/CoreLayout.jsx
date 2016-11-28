import React from 'react';
import HeaderOld from '../../components/Header';
import Header from '../../components/GfyHeader';
import Footer from '../../components/Footer';
import './CoreLayout.scss';
import '../../styles/core.scss';

export const CoreLayout = ({ children }) => (
  <div className="container text-center">
    <Header />
    <HeaderOld />
    <div className="core-layout__viewport">
      {children}
    </div>
    <Footer isPageStatic />
  </div>
);

CoreLayout.propTypes = {
  children: React.PropTypes.element.isRequired
};

export default CoreLayout;
