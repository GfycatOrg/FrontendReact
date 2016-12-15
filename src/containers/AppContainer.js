import React, { Component, PropTypes } from 'react'
import Helmet from 'react-helmet'
import { Router } from 'react-router'
import { Provider } from 'react-redux'

class AppContainer extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    layout: PropTypes.object.isRequired,
    routes: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
    routerKey: PropTypes.number
  }

  render() {
    const { history, layout, routes, routerKey, store } = this.props

    return (
      <Provider store={store}>
        <div>
          <Helmet {...layout} />
          <Router history={history} children={routes} key={routerKey} />
        </div>
      </Provider>
    )
  }
}

export default AppContainer
