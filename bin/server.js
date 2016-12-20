const path = require('path')
const express = require('express')
const favicon = require('serve-favicon')
const compression = require('compression')
const helmet = require('helmet')
const universalMiddleware = require('../dist/server').default
const config = require('../config/project.config')

module.exports = {
  app: function () {
    const app = express()

  	if (process.env.NODE_ENV !== 'production') {
      const webpack = require('webpack')
      const webpackDevMiddleware = require('webpack-dev-middleware')
      const webpackHotMiddleware = require('webpack-hot-middleware')
      const webpackConfig = require('../config/webpack.config.client')
      const compiler = webpack(webpackConfig)

      app.use(webpackDevMiddleware(compiler, {
        noInfo: true,
        publicPath: webpackConfig.output.publicPath
      }))

      app.use(webpackHotMiddleware(compiler))
    } else {
      app.use(compression())
      app.use(helmet())
    } 

    const publicPath = express.static(config.paths.dist())

    app.use('/static', publicPath)

    app.use('/static', favicon(config.paths.public('favicons/favicon.ico')))

    app.use('*', universalMiddleware)

    return app
  }
}
