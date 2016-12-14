import React, { Component, PropTypes } from 'react'
import Header from '../../components/Header'
import Modal from '../../components/Modal'
import Footer from '../../components/Footer'
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
        <Modal />
        <div className='component-container'>{children}</div>
        <Footer />
      </div>
    )
  }
}

export default CoreLayout

