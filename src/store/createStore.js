import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import makeRootReducer from './reducers'

export default (initialState = {}, history) => {
  const middleware = routerMiddleware(history)
  const store = createStore(
    makeRootReducer(),
    initialState,
    applyMiddleware(middleware)
  )

  store.asyncReducers = {}

  return store
}
