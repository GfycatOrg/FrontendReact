import qs from 'qs'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { browserHistory, createMemoryHistory, match, RouterContext } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import AppContainer from './containers/AppContainer'
import configureStore from './store/configureStore'
import createRoutes from './routes'

export default function universalMiddleware(req, res, next) {
  const params = qs.parse(req.query)
  const memoryHistory = createMemoryHistory(req.originalUrl)
  console.log('memory history', memoryHistory)
  const store = configureStore(memoryHistory)
  const routes = createRoutes(store)
  const history = syncHistoryWithStore(memoryHistory, store)

  match({ history, routes }, (err, redirect, props) => {
    if (redirect) {
      return res.redirect(redirect.pathname + redirect.search)
    } else if (err) {
      console.error('Router error', err)
        res.status(500).json(err)
    } else if (props) {
      console.log('renderProps', props)
      const renderedPage = renderPage(history, store, props)
      console.log(renderedPage)
      res.send(renderedPage)
    } else {
      res.sendStatus(404)
    }
  })
}

const renderPage = (history, store, { routes }) => (
  renderToString(<AppContainer history={history} store={store} routes={routes[0]} />)
)

