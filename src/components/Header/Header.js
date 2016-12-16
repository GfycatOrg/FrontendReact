import React, { Component, PropTypes } from 'react'
import Nav from '../Nav'
import Search from '../Search'
import UserMenu from '../UserMenu'
import './Header.scss'
//import openModal from '../RootModal'

class Header extends Component {
  // static propTypes = {
  //   store: PropTypes.object.isRequired
  // }

  render() {
    // const { store } = this.props

    return (
      <header className='header-container'>
        <Nav />
        <Search />
        {/*<button onClick={() => {dispatch(openModal({modalType: 'login'}))}}>Login</button>*/}
      </header>
    )
  }
}

export default Header
