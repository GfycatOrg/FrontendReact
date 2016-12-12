import React from 'react'
import { Route, IndexRoute } from 'react-router'
import CoreLayout from '../layouts/CoreLayout'
import Home from './Home'
import Team from './Team'

/**
 *  Use react-router PlainRoute object to build route definitions
 */
export const createRoutes = (store) => ({
  path: '/',
  component: CoreLayout,
  indexRoute: Home,
  childRoutes: [
    Team
  ]
})

/**
 *  The above is equivalent to:
 *
 *  <Route path="/" component={CoreLayout}>
 *    <IndexRoute component={Home}/>
 *    <Route path="/team" component={Team}/>
 *  </Route>
 */

export default createRoutes
