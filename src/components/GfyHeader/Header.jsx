import React from 'react';
import { Link } from 'react-router';
import style from './Header.scss';
import icons from 'styles/icons.scss';
import menuItems from './data';

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

const Dropdown = ({
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

Dropdown.propTypes = {
  menuItems: React.PropTypes.array
};

const SearchBar = () => (
  <form className={style.searchBar} action="https://gfycat.com/search/" method="get" target="_top" noValidate="">
    <input className={style.searchInput} name="request" required />
    <button className={style.searchButton} type="submit">
      <i className={`${icons.ic} ${icons.icSearch} ${icons.white}`}></i>
    </button>
  </form>
);

const Header = () => (
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
      <Dropdown menuItems={menuItems} />
    </div>
    <div className={style.center}>
      <SearchBar />
    </div>
    <div className={style.right}>
      <span className={style.bigScreen}>
        <Link to="/upload">
          <button className={style.uploadButton}>Upload</button>
        </Link>
        <div className={style.verticalDivider}></div>
        <a href={'https://gfycat.com/login?redirect_uri=' + document.location.href}>
          <button className={style.loginButton}>Log In</button>
        </a>
        <a href={'https://gfycat.com/signup?redirect_uri=' + document.location.href}>
          <button className={style.signupButton}>Sign Up</button>
        </a>
      </span>
      <span className={style.smallScreen}>
        <Link to="/upload">
          <button className={style.uploadButton}>
            <i className="ic ic-cloud-upload ic-cloud-upload--blue"></i>
          </button>
        </Link>
        <a href={'https://gfycat.com/login?redirect_uri=' + document.location.href}>
          <button className={style.loginButton}>
            <i className="ic ic-guest-user ic-guest-user--blue"></i>
          </button>
        </a>
      </span>
    </div>
  </div>
);

export default Header;
