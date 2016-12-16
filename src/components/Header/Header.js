import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Nav from '../Nav'
import Search from '../Search'
import UserMenu from '../UserMenu'
import './Header.scss'
import { actions } from '../RootModal'

class Header extends Component {
  // static propTypes = {
  //   store: PropTypes.object.isRequired
  // }
  constructor(props) {
    super(props)
  }

  render() {
    console.log('props', this.props)
    const { dispatch } = this.props

    return (
      <header className='header-container'>
        <Nav />
        <Search />
        <button onClick={() => {dispatch(actions.openModal({modalType: 'LOGIN'}))}}>Login</button>
      </header>
    )
  }
}

export default connect()(Header)
