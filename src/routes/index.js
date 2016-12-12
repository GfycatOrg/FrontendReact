import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './App'
import Home from './Home'
import Team from './Team'

/**
 *  Use react-router PlainRoute object to build route definitions
 */
export const createRoutes = (store) => ({
  path: '/',
  component: App,
  indexRoute: Home,
  childRoutes: [
    Team
  ]
})

/**
 *  The above is equivalent to:
 *
 *  <Route path="/" component={App}>
 *    <IndexRoute component={Home}/>
 *    <Route path="/team" component={Team}/>
 *  </Route>
 */

export default createRoutes
