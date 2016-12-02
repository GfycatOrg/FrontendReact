import React from 'react';
import footerData from './data.json';

import style from './Footer.scss'
import icons from 'styles/icons.scss';

import './Footer.scss';

const PageLink = ({
  text,
  url
}) => (
  <span className={style.pageLink}>
    <a alt={text} href={url}>{text}</a>
  </span>
);

PageLink.propTypes = {
  text: React.PropTypes.string.isRequired,
  url: React.PropTypes.string.isRequired
};

const SocialLink = ({
  name,
  url
}) => (

  <a className={`${style.socialLink} ${style[name]}`} href={url} target="_blank" rel="noopener noreferrer">
    <i className={`${icons.ic} ${icons.icLogo} ${icons[name]} ${style.icLogo} ${style[name]}`}></i>
  </a>
);

SocialLink.propTypes = {
  name: React.PropTypes.string.isRequired,
  url: React.PropTypes.string.isRequired
};

const Copyright = ({
  visible
}) => {
  if (visible) {
    return (
      <p className={style.copyright}>© 2016 Gfycat. <span>All rights reserved</span></p>
    );
  }
  return null;
};

Copyright.propTypes = {
  visible: React.PropTypes.bool
};

const Footer = ({
  isPageStatic
}) => (
  <div className={style.gfyPageFooter}>
    <div className={style.container}>
      <div className={style.pageLinks}>
        {
          footerData.pages.map((page, index) =>
            <PageLink
              key={index}
              {...page}
            />
          )
        }
      </div>
      <div className={style.socialLinks}>
        {
          footerData.socialLinks.map((link, index) =>
            <SocialLink
              key={index}
              {...link}
            />
          )
        }
      </div>
      <Copyright visible={isPageStatic} />
    </div>
  </div>
);

Footer.propTypes = {
  isPageStatic: React.PropTypes.bool
};

export default Footer;
