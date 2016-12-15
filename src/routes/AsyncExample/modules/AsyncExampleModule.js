import fetch from 'isomorphic-fetch'


/**
 *  Action types
 */
export const FETCH_DATA_REQUEST = 'FETCH_DATA_REQUEST'
export const FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE'
export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS'


/**
 *  Actions
 */
export const startFetching = () => ({
  type: FETCH_DATA_REQUEST
})

export const fetchedData = (data) => ({
  type: FETCH_DATA_SUCCESS,
  payload: data
})

export const errorFetching = (err) => ({
  type: FETCH_DATA_FAILURE,
  error: err
})

export const fetchData = () => {
  return (dispatch) => {
    dispatch(startFetching())
    return fetch('https://jsonplaceholder.typicode.com/posts/1')
      .catch(err => {
        return dispatch(errorFetching(err))
        })
      .then(response => {
        return dispatch(fetchedData(response.json()))
      })
  }
}

export const actions = { fetchData }


/**
 *  Selectors
 */
const SELECTORS = {
  [FETCH_DATA_REQUEST]: (state, action) => ({ ...state, fetching: true }),
  [FETCH_DATA_SUCCESS]: (state, action) => ({ ...state, fetching: false, fetchedData: action.payload }),
  [FETCH_DATA_FAILURE]: (state, action) => ({ ...state, fetching: false, error: action.error })
}


/**
 *  Reducers
 */
const initialState = { fetching: false, fetchedData: {}, error: {} }
const asyncExampleReducer = (state = initialState, action) => {
  const selector = SELECTORS[action.type]

  return selector ? selector(state, action) : state
}

export default asyncExampleReducer
