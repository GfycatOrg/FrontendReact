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
    console.log('modalType', modalType, 'modalProps', modalProps)
    if (typeof modalType === undefined || !modalType) return null
    const ActiveModal = MODAL_COMPONENTS[modalType]
    console.log('active modal', ActiveModal)
    return (
      <ActiveModal {...modalProps} />
    )
  }
}

export default RootModal
