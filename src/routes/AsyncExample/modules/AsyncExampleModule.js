import fetch from 'isomorphic-fetch'


/**
 *  Action types
 */
export const FETCHED_DATA = 'FETCHED_DATA'
export const FETCHING_DATA = 'FETCHING_DATA'
export const ERROR_FETCHING_DATA = 'ERROR_FETCHING_DATA'


/**
 *  Actions
 */
export const startFetching = () => ({
  type: FETCHING_DATA
})

export const fetchedData = (data) => ({
  type: FETCHED_DATA,
  payload: data
})

export const fetchDataError = (err) => ({
  type: ERROR_FETCHING_DATA
})

export const fetchData = () => {
  return (dispatch) => {
    dispatch(startFetching())
    return fetch('https://jsonplaceholder.typicode.com/posts/1')
      .catch(err => {
        return dispatch(fetchDataError(err))
      })
      .then(response => {
        console.log('api response', response)
        return response.json()
      })
      .then(data => {
        return dispatch(fetchedData(data))
      })
  }
}

export const actions = { fetchData }


/**
 *  Selectors
 */
const SELECTORS = {
  [FETCHING_DATA]: (state, actions) => ({ ...state, fetching: true }),
  [FETCHED_DATA]: (state, actions) => ({ ...state, fetching: false, fetchedData: action.payload }),
  [ERROR_FETCHING_DATA]: (state, actions) => ({ ...state, fetching: false })
}


/**
 *  Reducers
 */
const initialState = { fetching: false, fetchedData: {} }
const asyncExampleReducer = (state = initialState, action) => {
  const selector = SELECTORS[action.type]

  return selector ? selector(state, action) : state
}

export default asyncExampleReducer
