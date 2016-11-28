import React from 'react';
import { Link } from 'react-router';
import './Header.scss';

const MenuItem = ({
  text,
  url
}) => (
  <li className="menu-item">
    <a alt={text} href={url}>{text}</a>
  </li>
);

const Dropdown = ({
  menuItems
}) => (
  <div className="dropdown-container">
    <button className="open-button">
      <i className="ic ic-ellipsis ic-ellipsis--blue"></i>
    </button>
    <ul className="menu">
      { menuItems.map((item, index) => (
        <MenuItem key={index} {...item} />
      ))}
    </ul>
  </div>
);

const SearchBar = () => (
  <form className="search-bar" action="https://gfycat.com/search/" method="get" target="_top" noValidate="">
    <input className="search-input" name="request" required />
    <button className="search-button" type="submit">
      <i className="ic ic-search ic-search--white"></i>
    </button>
  </form>
);

class Header extends React.Component {
  constructor() {
    super();
    this.menuItems = [
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
        text: 'Slack',
        url: 'https://gfycat.com/slack'
      },
      {
        text: 'Gifbrewery',
        url: 'https://gfycat.com/gifbrewery'
      },
      {
        text: 'Vine Import',
        url: 'https://gfycat.com/vine-transfer'
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
  }

  render() {
    return (
      <div className="header-container">
        <div className="left">
          <a href="https://gfycat.com">
            <div className="ic ic-gfycat-logo-big ic-gfycat-logo-big--blue"></div>
          </a>
          <a href="https://gfycat.com">
            <div className="ic ic-gfycat-logo-small ic-gfycat-logo-small--blue"></div>
          </a>
          <a href="https://gfycat.com">
            <div className="logo-text">JIFFIER GIFS</div>
          </a>
          <Dropdown menuItems={this.menuItems} />
        </div>
        <div className="center">
          <SearchBar />
        </div>
        <div className="right">
          <span className="big-screen">
            <Link to="/upload">
              <button className="upload-button">Upload</button>
            </Link>
            <div className="vertical-divider"></div>
            <a href={"https://gfycat.com/login?redirect_uri=" + document.location.href}>
              <button className="login-button">Log In</button>
            </a>
            <a href={"https://gfycat.com/signup?redirect_uri=" + document.location.href}>
              <button className="signup-button">Sign Up</button>
            </a>
          </span>
          <span className="small-screen">
            <Link to="/upload">
              <button className="upload-button">
                <i className="ic ic-cloud-upload ic-cloud-upload--blue"></i>
              </button>
            </Link>
            <a href={"https://gfycat.com/login?redirect_uri=" + document.location.href}>
              <button className="login-button">
                <i className="ic ic-guest-user ic-guest-user--blue"></i>
              </button>
            </a>
          </span>
        </div>
      </div>
    );
  }
}

export default Header;
