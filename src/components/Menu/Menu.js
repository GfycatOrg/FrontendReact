import React, { Component, PropTypes } from 'react'
import { IndexLink, Link } from 'react-router'
import './Menu.scss'

class Menu extends Component {
  static propTypes = {
    links: PropTypes.array.isRequired
  }

  render() {
    const { links } = this.props
    const linkItems = links.map(link => <li key={link.title}><Link to={link.path} activeClassName='active'>{link.title}</Link></li>)

    return (
      <div className='menu-container'>
        <ul>
          <li className=''>
            <IndexLink to='/' activeClassName='active'>Home</IndexLink>
          </li>
          {linkItems}
        </ul>
      </div>
    )
  }
}

export default Menu

