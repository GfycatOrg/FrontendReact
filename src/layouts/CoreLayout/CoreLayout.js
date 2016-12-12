import React, { Component, PropTypes } from 'react'
import Header from '../../components/Header'
import '../../styles/core.scss'
import './CoreLayout.scss'

class CoreLayout extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  }

  render() {
    const { children } = this.props

    return (
      <div className='core-layout-container'>
        <Header />
        {children}
      </div>
    )
  }
}

export default CoreLayout

