import React, { Component, PropTypes } from 'react'
import Header from '../../../components/Header'
import './AppLayout.scss'

class AppLayout extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  }

  render() {
    const { children } = this.props

    return (
      <div className='container'>
        <Header />
        {children}
      </div>
    )
  }
}

export default AppLayout

