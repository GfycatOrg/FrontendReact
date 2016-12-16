'use strict'

const webpack = require('webpack')
const config = require('./project.config')
const debug = require('debug')('app:config:webpack:client')

const __DEV__ = config.globals.__DEV__
const __PROD__ = config.globals.__PROD__

debug('Creating webpack client configuration')

const webpackConfig = {
  name: 'client',
  devtool: config.compiler_devtool,
  target: 'web',
  // resolve: {
  //   root: config.paths.src(),
  //   extensions: ['', '.js', '.jsx', '.json']
  // },
  // module: {},
  entry: {
    app: __DEV__ ?
      [ `webpack-hot-middleware/client?path${config.compiler_public_path}__webpack_hmr`, config.paths.src('client.js') ] :
      [ config.paths.src('client.js') ],
    // vendor: config.compiler_vendors
  },
  output: {
    path: config.paths.dist(),
    filename: 'bundle.js',
    publicPath: config.compiler_public_path
  },
  // output: {
  //   filename: `[name].[${config.compiler_hash_type}].js`,
  //   path: config.paths.dist(),
  //   publicPath: config.compiler_public_path
  // },
  // externals: {
  //   'react/lib/ExecutionEnvironment': true,
  //   'react/lib/ReactContext': true,
  //   'react/addons': true
  // },
  plugins: [
    // Set NODE_ENV to production on compile time for minified version of react and redux on production
    new webpack.DefinePlugin(config.globals),
  ],
  module: {
    loaders: [
      { test: /\.(js|jsx)?$/,
        loader: 'babel',
        exclude: /node_modules/,
        include: [config.paths.src(), config.paths.base('config')],
        query: {
          presets: ['es2015', 'react', 'stage-0'],
          plugins: ["transform-decorators-legacy"]
        }
      },
      { test: /\.scss?$/,
        loader: 'style!css!sass' },
      { test: /\.css?$/,
        loader: 'style!css' },
      { test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ] },
      { test: /\.(ttf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file' },
      { test: /\.json$/,
        loader: 'json-loader' }
    ]
  }
}

if (__DEV__) {
  debug('Enable webpack plugins for dev.')
  webpackConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  )
} else if (__PROD__) {
  debug('Enable webpack plugins for prod.')
  webpackConfig.plugins.push(
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false
      }
    })
  )
}

module.exports = webpackConfig
