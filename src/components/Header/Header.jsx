import React from 'react';
import { IndexLink, Link } from 'react-router';
import './Header.scss';

export const Header = () => (
  <div>
    <h1>Test</h1>
    <IndexLink to="/" activeClassName="route--active">
      Home
    </IndexLink>
    {' · '}
    <Link to="/counter" activeClassName="route--active">
      Counter
    </Link>
    {' · '}
    <Link to="/upload" activeClassName="route--active">
      Upload
    </Link>
  </div>
);

export default Header;
