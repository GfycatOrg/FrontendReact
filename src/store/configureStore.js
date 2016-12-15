import createStore from './createStore'
import throttle from 'lodash/throttle'
import { loadState, setState } from './localStorage'
// import { browserHistory } from 'react-router'
// import { syncHistoryWithStore } from 'react-router-redux'

const configureStore = (history) => {
  const persistedState = loadState()
  console.log('persisted state', persistedState)
  const store = createStore(persistedState, history)

  store.subscribe(throttle(() => {
    setState(store.getState())
  }, 1000))

  return store
}

export default configureStore
