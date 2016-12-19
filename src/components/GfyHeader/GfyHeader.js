import React from 'react';
import { Link } from 'react-router';
import './GfyHeader.scss';
import headerData from './data';
import { actions } from '../RootModal'
import { connect } from 'react-redux'

const MenuItem = ({
  text,
  url
}) => (
  <li className="menu-item">
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
  <div className="dropdown-container">
    <button className="open-button">
      <i className="ic ic-ellipsis blue"></i>
    </button>
    <ul className="menu">
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
  <div className="dropdown-container user-menu-dropdown">
    <button className="open-button">
      <span className="username">{username}</span>
      <i className="ic ic-guest-user blue"></i>
      <span className="caret"></span>
    </button>
    <ul className="menu">
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
  <form className="search-bar" action="https://gfycat.com/search/"
        method="get" target="_top" noValidate="">
    <input className="search-input" name="request" required />
    <button className="search-button" type="submit">
      <i className="ic ic-search white"></i>
    </button>
  </form>
);

const NotLoggedIn = ({
  currentLocation, dispatch
}) => (
  <span>
    <span className="big-screen">
      <a href={`https://gfycat.com/login?redirect_uri=${currentLocation}`}>
        <button className="login-button">Log In</button>
      </a>
      {/*<button className="login-button" onClick={() => {dispatch(actions.openModal({modalType: 'LOGIN'}))}}>Log In</button>*/}
      <a href={`https://gfycat.com/signup?redirect_uri=${currentLocation}`}>
        <button className="signup-button">Sign Up</button>
      </a>
    </span>
    <span className="small-screen">
      <a href={'https://gfycat.com/login?redirect_uri='}>
        <button className="login-button">
          <i className="ic ic-guest-user blue"></i>
        </button>
      </a>
    </span>
  </span>
);

class GfyHeader extends React.Component {
  static propTypes = {
    dispatch: React.PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
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
    const { dispatch } = this.props

    return (
      <div className="header-container">
        <div className="left">
          <a href="https://gfycat.com">
            <div className="ic ic-gfycat-log-big blue"></div>
          </a>
          <a href="https://gfycat.com">
            <div className="ic ic-gfycat-logo-small blue"></div>
          </a>
          <a href="https://gfycat.com">
            <div className="logo-text">JIFFIER GIFS</div>
          </a>
          <PagesDropdown menuItems={headerData.pages} />
        </div>
        <div className="center">
          <SearchBar />
        </div>
        <div className="right">
          <span className="big-screen">
            <a href="https://gfycat.com/upload">
              <button className="upload-button">Upload</button>
            </a>
            <div className="vertical-divider"></div>
          </span>
          <span className="small-screen">
            <a href="https://gfycat.com/upload">
              <button className="upload-button">
                <i className="ic ic-cloud-upload blue"></i>
              </button>
            </a>
          </span>
          {
            this.username ?
            <UserMenuDropdown menuItems={headerData.userMenu} username={this.username} /> :
            <NotLoggedIn dispatch={dispatch} currentLocation={this.currentLocation} />
          }
        </div>
      </div>
    )
  }
}

export default connect()(GfyHeader)
