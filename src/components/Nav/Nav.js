import React from 'react'
import Menu from '../Menu'
import './Nav.scss'
import { IndexLink, Link } from 'react-router'

const links = [
  {
    title: 'Team',
    path: '/team'
  },
  {
    title: 'Async Example',
    path: '/async_example'
  }
]

export const Nav = () => (
  <nav className='nav-container'>
    <Menu links={links} />
  </nav>
)

export default Nav
