import React from 'react'
import { render } from 'react-dom'
import { browserHistory, match } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { Resolver }  from 'react-resolver'
import AppContainer from './containers/AppContainer'
import configureStore from './store/configureStore'
import createRoutes from './routes'
import TemplateLayout from './layouts/TemplateLayout'

const store = configureStore(browserHistory)
const routes = createRoutes(store)
const history = syncHistoryWithStore(browserHistory, store)


// render(
//   <AppContainer history={history} layout={TemplateLayout} store={store} routes={routes} />,
//   document.getElementById('root')
// )


let _render = (routerKey = null) => {
  match({ history, routes }, (error, redirect, props) => {
    if (error) {
      console.err(error)
      return
    }

    Resolver.render( () => 
      <AppContainer {...props} history={history} layout={TemplateLayout} store={store} routes={routes} />, 
      document.getElementById('root'))
  })
}

if (process.env.NODE_ENV !== 'production' && module.hot) {
  const renderApp = _render
  const renderError = (error) => {
    const RedBox = require('redbox-react').default
    render(<RedBox error={error} />, document.getElementById('root'))
  }
  _render = () => {
    try {
      renderApp(Math.random())
    } catch (e) {
      renderError(e)
    }
  }
  module.hot.accept(['./routes/index'], () => _render())
}

_render()
