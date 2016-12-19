import React, { Component, PropTypes } from 'react'
import './RootModal.scss'
import LoginModal from '../../LoginModal'

const MODAL_COMPONENTS = {
  'LOGIN': LoginModal
}

class RootModal extends Component {
  static propTypes = {
    modalType: PropTypes.string,
    modalProps: PropTypes.object
  }

  constructor(props) {
    super(props)
  }

  handleOnOutsideClick(event) {
    this.props.removeModal(this.props.id)
  }

  render() {
    const { modalType, modalProps } = this.props

    if (typeof modalType === 'undefined' || !modalType) return null

    const ActiveModal = MODAL_COMPONENTS[modalType]

    return (
      <div className='modal-container'><ActiveModal {...modalProps} /></div>
    )
  }
}

export default RootModal
