import React from 'react'
import { render } from 'react-dom'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import AppContainer from './containers/AppContainer'
import configureStore from './store/configureStore'
import createRoutes from './routes'

const store = configureStore(browserHistory)
const routes = createRoutes(store)
const history = syncHistoryWithStore(browserHistory, store)


render(
  <AppContainer history={history} store={store} routes={routes} />,
  document.getElementById('root')
)
