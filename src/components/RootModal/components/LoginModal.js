import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

/**
 *  Action types
 */
export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const HIDE_MODAL = 'HIDE_MODAL'


/**
 *  Actions
 */
export const loginRequest = ({username, password}) => ({
  type: LOGIN_REQUEST,
  username,
  password
})

export const hideModal = () => ({
  type: HIDE_MODAL
})


/**
 *  Action Creators
 */
export const login = () => {
  return (dispatch) => {
    return dispatch(loginRequest())
  }
}


const mapStateToProps = (state) => ({
  loginRequest: state.login
})


/**
 *  Component
 */
class LoginModal extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    const { dispatch } = this.props
  }

  render() {
    return (
      <div>
        Login Modal
        <button onClick={() => {
          dispatch(loginRequest({username: 'user', password: 'pswd'}))
        }}>
          Login
        </button>
        <button onClick={() => dispatch(hideModal())}>
          Cancel
        </button>
      </div>
    )
  }

}


export default connect(mapStateToProps)(LoginModal)
