import React from 'react';

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

class Footer extends React.Component {
  constructor() {
    super();
    this.pages = [
      {
        text: 'About',
        url: 'https://gfycat.com/about'
      },
      {
        text: 'Team',
        url: 'https://gfycat.com/team'
      },
      {
        text: 'Blog',
        url: 'https://medium.com/@Gfycat'
      },
      {
        text: 'Jobs',
        url: 'https://gfycat.com/jobs'
      },
      {
        text: 'Partners',
        url: 'https://gfycat.com/partners'
      },
      {
        text: 'FAQ',
        url: 'https://gfycat.com/faq'
      },
      {
        text: 'Support',
        url: 'https://gfycat.com/support'
      },
      {
        text: 'Developer API',
        url: 'https://developers.gfycat.com/api'
      },
      {
        text: 'Terms and Conditions',
        url: 'https://gfycat.com/terms'
      },
      {
        text: 'Privacy',
        url: 'https://gfycat.com/privacy'
      },
      {
        text: 'DMCA',
        url: 'https://gfycat.com/dmca'
      }
    ];
    this.socialLinks = [
      {
        name: 'fb',
        url: 'https://www.facebook.com/thegfycat/'
      },
      {
        name: 'tw',
        url: 'https://twitter.com/Gfycat'
      },
      {
        name: 'inst',
        url: 'https://www.instagram.com/gfycat/'
      },
      {
        name: 'tmb',
        url: 'http://gfycat.tumblr.com'
      },
      {
        name: 'pin',
        url: 'https://www.pinterest.com/gfycat'
      },
      {
        name: 'vk',
        url: 'https://www.pinterest.com/gfycat'
      }
    ];
  }

  render() {
    return (
      <div className="gfy-page-footer">
        <div className="container">
          <div className="page-links">
            {
              this.pages.map((page, index) =>
                <PageLink
                  key={index}
                  {...page}
                />
              )
            }
          </div>
          <div className="social-links">
            {
              this.socialLinks.map((link, index) =>
                <SocialLink
                  key={index}
                  {...link}
                />
              )
            }
          </div>
          <Copyright visible={this.props.isPageStatic} />
        </div>
      </div>
    );
  }
}

Footer.propTypes = {
  isPageStatic: React.PropTypes.bool
};

export default Footer;
