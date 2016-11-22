// ------------------------------------
// Constants
// ------------------------------------
export const DROP_AREA_ACTIVE = 'DROP_AREA_ACTIVE';
export const NEW_FILES_CHOSEN = 'NEW_FILES_CHOSEN';
export const STATE_URL_PENDING = 'STATE_URL_PENDING';


const fileListToArray = (filelist) => {
  if (filelist) {
    return Array.prototype.slice.call(filelist);
  }
  return [];
};


// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [DROP_AREA_ACTIVE]: (state, action) => {
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
  },

  [NEW_FILES_CHOSEN]: (state, action) => {
    return {
      ...state,
      files: [
        ...state.files,
        ...fileListToArray(action.files)
      ]
    };
  }
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  pending: false,
  dropAreaActive: false,
  files: []
};

export default function SimpleUploadReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  let result = handler ? handler(state, action) : state;
  console.log('result', result);
  return result;
}
