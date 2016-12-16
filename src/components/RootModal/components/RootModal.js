import React, { Component, PropTypes } from 'react'
import './RootModal.scss'
import LoginModal from './LoginModal'

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
    console.log('props', this.props)
    const { modalType, modalProps } = this.props
  }

  handleOnOutsideClick(event) {
    this.props.removeModal(this.props.id)
  }

  render() {
    if (typeof modalType === undefined) return <div>no data</div>

    const ActiveModal = MODAL_COMPONENTS[modalType]
    return (
      <ActiveModal {...modalProps} />
    )
  }
}

export default RootModal
