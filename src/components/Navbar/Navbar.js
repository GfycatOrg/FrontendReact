import React from 'react';
import { IndexLink, Link } from 'react-router';
import './Navbar.scss';

export const Navbar = () => (
  <div id="navbar">
    <nav className="navbar">
      <div className="container">
        <ul className="navbar-list">
          <li className="navbar-item">
            <IndexLink className="navbar-link" to="/">Home</IndexLink>
          </li>
          <li>
            <Link className="navbar-link" to="/counter">Counter</Link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
);

export default Navbar;
