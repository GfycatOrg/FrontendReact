import Koa from 'koa'
import convert from 'koa-convert'
import webpack from 'webpack'
import webpackConfigClient from '../build/webpack.config.client'
import serve from 'koa-static'
import proxy from 'koa-proxy'
import fs from 'fs-extra'
import _debug from 'debug'
import config from '../config'
import webpackDevMiddleware from './middleware/webpack-dev'
import webpackHMRMiddleware from './middleware/webpack-hmr'
import universalMiddleware from './middleware/universal'

const debug = _debug('app:server')
const paths = config.utils_paths

export default async () => {
  const app = new Koa()
  var clientInfo

  // Enable koa-proxy if it has been enabled in the config.
  if (config.proxy && config.proxy.enabled) {
    app.use(convert(proxy(config.proxy.options)))
  }

  // ------------------------------------
  // Apply Webpack HMR Middleware
  // ------------------------------------
  if (config.env === 'development') {
    const compiler = webpack(webpackConfigClient)

    // Enable webpack-dev and webpack-hot middleware
    const { publicPath } = webpackConfigClient.output

    // Catch the hash of the build in order to use it in the universal middleware
    compiler.plugin('done', stats => {
      // Create client info from the fresh build
      clientInfo = {
        assetsByChunkName: {
          app: `app.${stats.hash}.js`,
          vendor: `vendor.${stats.hash}.js`
        }
      }
    })

    app.use(webpackDevMiddleware(compiler, publicPath))
    app.use(webpackHMRMiddleware(compiler))

    // Serve static assets from ~/src/static since Webpack is unaware of
    // these files. This middleware doesn't need to be enabled outside
    // of development since this directory will be copied into ~/dist
    // when the application is compiled.
    app.use(serve(paths.src('static')))
  } else {
    // Get assets from client_info.json
    debug('Read client info.')
    fs.readJSON(paths.dist(config.universal.client_info), (err, data) => {
      if (err) {
        debug('Failed to read client_data!')
        throw Error(err)
      }
      clientInfo = data
    })

    // Serving ~/dist by default. Ideally these files should be served by
    // the web server and not the app server when universal is turned off,
    // but this helps to demo the server in production.
    app.use(serve(paths.public()))
  }

  let um = await universalMiddleware()
  app.use(um.default(() => clientInfo))

  return app
}
