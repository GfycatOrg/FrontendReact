import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

const initialReducers = {
  team: (state = {}) => state
}

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    routing: routerReducer,
    ...initialReducers,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
