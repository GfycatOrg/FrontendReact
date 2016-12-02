import React from 'react'
import GfyHeader from '../../components/GfyHeader'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import style from './CoreLayout.scss'
import '../../styles/core.scss'

export const CoreLayout = ({ children }) => (
  <div className={`${style.container}`}>
    <GfyHeader />
    <div className={style.mainContainer}>
      {children}
    </div>
    <Footer isPageStatic />
  </div>
)

CoreLayout.propTypes = {
  children: React.PropTypes.element.isRequired
}

export default CoreLayout
