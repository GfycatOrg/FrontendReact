import React from 'react'
import { Route, IndexRoute } from 'react-router'
import CoreLayout from '../layouts/CoreLayout'
import Home from './Home'
import Team from './Team'
import AsyncExample from './AsyncExample'

/**
 *  Use react-router PlainRoute object to build route definitions
 */
export const createRoutes = (store) => {
  const requireAuth = (nextState, replace, cb) => {
    const { authenticated } = store.getState()
    if (!authenticated) {
      replace({
        pathname: '/login',
        state: { nextPathname: nextState.location.pathname }
      })
    }
    cb()
  }

  const redirectAuth = (nextState, replace, cb) => {
    const { authenticated } = store.getState()
    if (authenticated) {
      replace({
        pathname: '/'
      })
    }
    cb()
  }

  return ({
    path: '/',
    component: CoreLayout,
    indexRoute: Home,
    childRoutes: [
      Team,
      AsyncExample(store)
    ]
  })
}

/**
 *  The above is equivalent to:
 *
 *  <Route path="/" component={CoreLayout}>
 *    <IndexRoute component={Home}/>
 *    <Route path="/team" component={Team}/>
 *  </Route>
 */

export default createRoutes
