import { injectReducer } from '../../store/reducers'
import AsyncExample from './containers/AsyncExampleContainer'
import asyncExampleReducer from './modules/AsyncExampleModule'

export default (store) => ({
  path: 'async_example',
  getComponent (nextState, cb) {
    injectReducer(store, { key: 'AsyncExample', reducer: asyncExampleReducer })
    cb(null, AsyncExample)
  }
})
