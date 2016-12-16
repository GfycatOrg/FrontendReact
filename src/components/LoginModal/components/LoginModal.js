import React, { Component, PropTypes } from 'react'
import { actions } from '../../RootModal'

/**
 *  Component
 */
class LoginModal extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
  }

  render() {
    const { dispatch } = this.props

    return (
      <div>
        Login Modal
        <button onClick={() => {
          dispatch(loginRequest({username: 'user', password: 'pswd'}))
        }}>
          Login
        </button>
        <button onClick={() => dispatch(actions.hideModal())}>
          Cancel
        </button>
      </div>
    )
  }
}

export default LoginModal
