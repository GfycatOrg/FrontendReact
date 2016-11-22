// ------------------------------------
// Constants
// ------------------------------------
export const DROP_AREA_ACTIVE = 'DROP_AREA_ACTIVE'
export const FILES_DROP = 'FILES_DROP'
export const STATE_URL_PENDING = 'STATE_URL_PENDING'


// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [DROP_AREA_ACTIVE]: (state, action) => {
    console.log('DROP_AREA_ACTIVE', action.dropAreaActive);
    return {
      ...state,
      dropAreaActive: action.dropAreaActive
    };
  },

  [STATE_URL_PENDING]: (state, action) => {
    return {
      ...state,
      pending: action.pending
    };
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  pending: false,
  dropAreaActive: false
}

export default function SimpleUploadReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  let result = handler ? handler(state, action) : state
  console.log('result', result);
  return result
}
