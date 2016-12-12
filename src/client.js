import React from 'react'
import { render } from 'react-dom'
import AppContainer from './containers/AppContainer'
import configureStore from './store/configureStore'
import createRoutes from './routes/index'

const store = configureStore()
const routes = createRoutes(store)

render(
  <AppContainer store={store} routes={routes} />,
  document.getElementById('root')
)
