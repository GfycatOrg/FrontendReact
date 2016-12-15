import qs from 'qs'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { browserHistory, createMemoryHistory, match, RouterContext } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import Helmet from 'react-helmet'
import { renderHtmlLayout } from 'helmet-webpack-plugin'
import { Resolver } from 'react-resolver'
import TemplateLayout from './layouts/TemplateLayout'
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
      // const renderedPage = renderPage(history, store, props)
      renderPage(history, store, props).then( renderedPage => res.send(renderedPage))
      // res.send(renderedPage)
    } else {
      //TODO: render 404 page
      res.sendStatus(404)
    }
  })
}

const renderPage = (history, store, { routes }) => {
  const layout = Object.assign(TemplateLayout, {link: [
    {rel: 'stylesheet', href: '/static/server.css'}
  ]})
  console.log('layout', layout)
  // const content = renderToString(<AppContainer history={history} layout={layout} store={store} routes={routes[0]} />)
  return Resolver.resolve( () => (<AppContainer history={history} layout={layout} store={store} routes={routes[0]} />)).then( ({ Resolved, data }) => {
    const content = renderToString(<Resolved />)
    const head = Helmet.rewind()
    // key is purely for react to iterate the array
    const body = <div key='body' id='root' dangerouslySetInnerHTML={{__html:content}} />
    const scripts = <script key='scripts' type='text/javascript' src='/static/bundle.js' />
    return renderHtmlLayout(head, [body, scripts])
  })
}

