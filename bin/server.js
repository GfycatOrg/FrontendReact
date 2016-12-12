const path = require('path')
const express = require('express')
const helmet = require('helmet')

// import React from 'react'
// import { renderToString } from 'react-dom/server'
// import { match, RouterContext } from 'react-router'
// import routes from './src/routes'

module.exports = {
  app: function () {
    const app = express()

  	if (process.env.NODE_ENV !== 'production') {
      const webpack = require('webpack')
      const webpackDevMiddleware = require('webpack-dev-middleware')
      const webpackHotMiddleware = require('webpack-hot-middleware')
      const config = require('../config/webpack.config.dev')
      const compiler = webpack(config)

      app.use(webpackDevMiddleware(compiler, {
        noInfo: true,
        publicPath: '/static/'
      }))
      
      app.use(webpackHotMiddleware(compiler))
    } else {
      app.use(helmet())
    }

    const publicPath = express.static(path.resolve(__dirname, 'dist'))

    app.use('/static', publicPath)
    app.get('/*', (req, res) => {
      res.sendFile(path.resolve(__dirname, '../index.html'));
      // match({ routes: routes, location: req.url }, (err, redirect, props) => {
      //   const appHtml = renderToString(<RouterContext {...props} />)
      //   res.send(renderPage(appHtml))
      // })
    }) 

    return app
  }
}

// function renderPage(appHtml) {
//   return `
//     <!doctype html>
//     <html>
//       <head></head>
//       <body>
//         <div id=root></div>
//         <script src='/bundle.js'></script>
//       </body>
//     </html>
//   `
// }
