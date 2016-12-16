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
