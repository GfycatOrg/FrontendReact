import React from 'react'
import Menu from '../Menu'
import './UserMenu.scss'

const links = [
  {
    title: 'Team',
    path: '/team'
  }
]

export const UserMenu = () => (
  <nav className='usermenu-container'>
    <Menu links={links} />
  </nav>    
)
