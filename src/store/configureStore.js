import createStore from './createStore'
import throttle from 'lodash/throttle'
import { loadState, setState } from './localStorage'

const configureStore = () => {
  const persistedState = loadState()
  const store = createStore(persistedState)

  store.subscribe(throttle(() => {
    setState(store.getState())
  }, 1000))

  return store
}

export default configureStore
