/**
 *  Action types
 */
export const OPEN_MODAL = 'OPEN_MODAL'
export const HIDE_MODAL = 'HIDE_MODAL'


/**
 *  Actions
 */
export const openModal = (modalType) => ({
  type: OPEN_MODAL,
  ...modalType
})

export const hideModal = () => ({
  type: HIDE_MODAL
})


/**
 *  Export all action creators in one object
 */
export const actions = { openModal, hideModal }


/**
 *  Selectors
 */
const SELECTORS = {
  [OPEN_MODAL]: (state, action) => ({
    ...state,
    modalType: action.modalType,
    modalProps: action.modalProps
  }),
  [HIDE_MODAL]: (state, action) => ({
    ...state,
    modalType: null,
    modalProps: {}
  }),
}


/**
 *  Reducers
 */
const initialState = { modalType: null, modalProps: {} }
const RootModalReducer = (state = initialState, action) => {
  const selector = SELECTORS[action.type]

  return selector ? selector(state, action) : state
}

export default RootModalReducer
