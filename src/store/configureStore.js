import createStore from './createStore'
import throttle from 'lodash/throttle'
import { loadState, setState } from './localStorage'
// import { browserHistory } from 'react-router'
// import { syncHistoryWithStore } from 'react-router-redux'

const configureStore = (history) => {
  // const persistedState = loadState()
  const persistedState = typeof window !== 'undefined' && window ? window.___INITIAL_STATE__ : loadState()
  const store = createStore(persistedState, history)

  if (typeof window !== 'undefined' && window) {
    store.subscribe(throttle(() => {
      setState(store.getState())
    }, 1000))
  }

  return store
}

export default configureStore
