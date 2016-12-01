import React from 'react';
import { pages, socialLinks } from './data';
import './Footer.scss';

const PageLink = ({
  text,
  url
}) => (
  <span className="page-link">
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
  <a className={`social-link social-link--${name}`} href={url} target="_blank" rel="noopener noreferrer">
    <i className={`ic ic-logo-${name}`}></i>
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
      <p className="copyright">© 2016 Gfycat. <span>All rights reserved</span></p>
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
  <div className="gfy-page-footer">
    <div className="container">
      <div className="page-links">
        {
          pages.map((page, index) =>
            <PageLink
              key={index}
              {...page}
            />
          )
        }
      </div>
      <div className="social-links">
        {
          socialLinks.map((link, index) =>
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
