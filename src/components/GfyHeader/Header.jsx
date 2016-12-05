import React from 'react';
import { Link } from 'react-router';
import style from './Header.scss';
import icons from 'styles/icons.scss';
import headerData from './data';

const MenuItem = ({
  text,
  url
}) => (
  <li className={style.menuItem}>
    <a alt={text} href={url}>{text}</a>
  </li>
);

MenuItem.propTypes = {
  text: React.PropTypes.string,
  url: React.PropTypes.string
};

const PagesDropdown = ({
  menuItems
}) => (
  <div className={style.dropdownContainer}>
    <button className={style.openButton}>
      <i className={`${icons.ic} ${icons.icEllipsis} ${icons.blue}`}></i>
    </button>
    <ul className={style.menu}>
      { menuItems.map((item, index) => (
        <MenuItem key={index} {...item} />
      ))}
    </ul>
  </div>
);

PagesDropdown.propTypes = {
  menuItems: React.PropTypes.array
};


const UserMenuDropdown = ({
  username
}) => (
  <div className={`${style.dropdownContainer} ${style.userMenuDropdown}`}>
    <button className={style.openButton}>
      <span className={style.username}>{username}</span>
      <i className={`${icons.ic} ${icons.icGuestUser} ${icons.blue}`}></i>
      <span className={style.caret}></span>
    </button>
    <ul className={style.menu}>
      <MenuItem text="Profile" url={`https://gfycat.com/@${username}`} />
      <MenuItem text="My library" url={`https://gfycat.com/@${username}/library`} />
      <MenuItem text="Cloud" url={`https://gfycat.com/useraccount/${username}`} />
      <MenuItem text="Settings" url="https://gfycat.com/settings/account" />
      <MenuItem text="Log Out" url="" />
    </ul>
  </div>
);

UserMenuDropdown.propTypes = {
  username: React.PropTypes.string
};

const SearchBar = () => (
  <form className={style.searchBar} action="https://gfycat.com/search/"
        method="get" target="_top" noValidate="">
    <input className={style.searchInput} name="request" required />
    <button className={style.searchButton} type="submit">
      <i className={`${icons.ic} ${icons.icSearch} ${icons.white}`}></i>
    </button>
  </form>
);

const NotLoggedIn = ({
  currentLocation
}) => (
  <span>
    <span className={style.bigScreen}>
      <a href={`https://gfycat.com/login?redirect_uri=${currentLocation}`}>
        <button className={style.loginButton}>Log In</button>
      </a>
      <a href={`https://gfycat.com/signup?redirect_uri=${currentLocation}`}>
        <button className={style.signupButton}>Sign Up</button>
      </a>
    </span>
    <span className={style.smallScreen}>
      <a href={'https://gfycat.com/login?redirect_uri='}>
        <button className={style.loginButton}>
          <i className={`${icons.ic} ${icons.icGuestUser} ${icons.blue}`}></i>
        </button>
      </a>
    </span>
  </span>
);

class Header extends React.Component {
  constructor() {
    super();
    if (typeof window !== 'undefined') {
      this.currentLocation = window.location.href;
    } else {
      this.currentLocation = '';
    }

    if (typeof localStorage !== 'undefined') {
      this.username = localStorage.getItem('username');
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
   return false; // TODO change when header has dynamic data
  }

  componentDidMount() {
    console.log('componentDidMount', this.username);
  }

  render() {
    return (
      <div className={style.headerContainer}>
        <div className={style.left}>
          <a href="https://gfycat.com">
            <div className={`${icons.ic} ${icons.icGfycatLogoBig} ${style.icGfycatLogoBig} ${icons.blue}`}></div>
          </a>
          <a href="https://gfycat.com">
            <div className={`${icons.ic} ${icons.icGfycatLogoSmall} ${style.icGfycatLogoSmall} ${icons.blue}`}></div>
          </a>
          <a href="https://gfycat.com">
            <div className={style.logoText}>JIFFIER GIFS</div>
          </a>
          <PagesDropdown menuItems={headerData.pages} />
        </div>
        <div className={style.center}>
          <SearchBar />
        </div>
        <div className={style.right}>
          <span className={style.bigScreen}>
            <a href="https://gfycat.com/upload">
              <button className={style.uploadButton}>Upload</button>
            </a>
            <div className={style.verticalDivider}></div>
          </span>
          <span className={style.smallScreen}>
            <a href="https://gfycat.com/upload">
              <button className={style.uploadButton}>
                <i className={`${icons.ic} ${icons.icCloudUpload} ${icons.blue}`}></i>
              </button>
            </a>
          </span>
          {
            this.username ?
            <UserMenuDropdown menuItems={headerData.userMenu} username={this.username} /> :
            <NotLoggedIn currentLocation={this.currentLocation} />
          }
        </div>
      </div>
    )
  }
}

export default Header;
