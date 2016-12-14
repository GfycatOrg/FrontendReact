import React from 'react'
import Menu from '../Menu'
import './Nav.scss'
import { IndexLink, Link } from 'react-router'

const links = [
  {
    title: 'Team',
    path: '/team'
  }
]

export const Nav = () => (
  <nav className='nav-container'>
    <Menu links={links} />
  {/*<ul>
      <li>
        <IndexLink to='/' activeClassName='active'>Home</IndexLink>
      </li>
      <li>
        <Link to='/team' activeClassName='active'>Team</Link>
      </li>
    </ul>*/}

  </nav>
)

export default Nav
