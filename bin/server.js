const path = require('path')
const express = require('express')
const compression = require('compression')
const helmet = require('helmet')
const universalMiddleware = require('../dist/server').default

module.exports = {
  app: function () {
    const app = express()

  	if (process.env.NODE_ENV !== 'production') {
      const webpack = require('webpack')
      const webpackDevMiddleware = require('webpack-dev-middleware')
      const webpackHotMiddleware = require('webpack-hot-middleware')
      const config = require('../config/webpack.config.dev.client')
      const compiler = webpack(config)

      app.use(webpackDevMiddleware(compiler, {
        noInfo: true,
        publicPath: config.output.publicPath
      }))
      
      app.use(webpackHotMiddleware(compiler))
    } else {
      app.use(compression())
      app.use(helmet())
    }

    const publicPath = express.static(path.resolve(__dirname, 'dist'))

    app.use('/static', publicPath)
    // app.get('/*', (req, res) => {
    //   res.sendFile(path.resolve(__dirname, '../index.html'));
    // })

    app.use('*', universalMiddleware)

    return app
  }
}
