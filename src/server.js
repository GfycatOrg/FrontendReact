import qs from 'qs'
import React from 'react'
// import { renderToString } from 'react-dom/server'
import { browserHistory, createMemoryHistory, match, RouterContext } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import Helmet from 'react-helmet'
// import { renderHtmlLayout } from 'helmet-webpack-plugin'
import { renderHtmlLayout } from './utils/renderHtmlLayout'
import { Resolver } from 'react-resolver'
import TemplateLayout from './layouts/TemplateLayout'
import AppContainer from './containers/AppContainer'
import configureStore from './store/configureStore'
import createRoutes from './routes'

export default function universalMiddleware(req, res, next) {
  const params = qs.parse(req.query)
  const memoryHistory = createMemoryHistory(req.originalUrl)
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
      renderPage(history, store, props, routes).then( renderedPage => res.send(renderedPage))
    } else {
      //TODO: render 404 page
      res.sendStatus(404)
    }
  })
}

const renderPage = (history, store, renderProps, routes) => {
  const layout = Object.assign(TemplateLayout, {link: [
    {rel: 'stylesheet', href: '/static/server.css'}
  ]})

  return Resolver.resolve( () => (<AppContainer {...renderProps} routerKey={Math.random()} history={history} layout={layout} store={store} routes={routes} />)).then( ({ Resolved, data }) => {
    // const content = renderToString(<Resolved />)
    const head = Helmet.rewind()
    // key is purely for react to iterate the array
    const content = Resolved
    // const body = <div key='body' id='root' dangerouslySetInnerHTML={{__html:content}} />
    // const scripts = [
    //   <script key='clientBundle' type='text/javascript' src='/static/bundle.js' />,
    //   <script key='resolverPayload' type='text/javascript'>__REACT_RESOLVER_PAYLOAD__={JSON.stringify(data)}</script>,
    //   <script key='initalState' type='text/javascript'>`___INITIAL_STATE__ = ${JSON.stringify(store.getState())}`</script>
    // ]
    const scripts = [
      <script key='clientBundle' type='text/javascript' src='/static/bundle.js' />
    ]

    // return renderHtmlLayout(head, [body, ...scripts])
    return renderHtmlLayout(head, content, scripts, store.getState())//data)
  })
}
