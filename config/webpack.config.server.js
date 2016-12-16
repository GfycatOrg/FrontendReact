'use strict'

const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const config = require('./project.config')
const debug = require('debug')('app:config:webpack:dev:server')

const __DEV__ = config.globals.__DEV__
const __PROD__ = config.globals.__PROD__

debug('Creating webpack dev server configuration')

const ExtractCSS = new ExtractTextPlugin('[name].css', {
  allChunks: false,
  disable: false
})

const ExtractSCSS = new ExtractTextPlugin('[name].css', {
  allChunks: false,
  disable: false
})


// The configuration for the server-side rendering
const webpackConfig = {
    name: 'dev.server',
    devtool: config.compiler_devtool,
    // resolve: {
    //   root: config.paths.src(),
    //   extensions: ['', '.js', '.jsx', '.json']
    // },
    // context: path.resolve(__dirname, '../src'),
    entry: {
      server: config.paths.src('server.js')
    },
    target: 'node',
    output: {
      // The output directory as absolute path
      path: config.paths.dist(),
      // The filename of the entry chunk as relative path inside the output.path directory
      filename: 'server.js',
      // The output path from the view of the Javascript
      publicPath: config.compiler_public_path,
      libraryTarget: 'commonjs2'
    },
    // externals: {
    //   'react/lib/ExecutionEnvironments': true,
    //   'react/lib/ReactContext': true,
    //   'react/addons': true
    // },
    plugins: [
      new webpack.DefinePlugin(config.globals),
      ExtractCSS,
      ExtractSCSS
    ],
    module: {
      loaders: [
        {
          test: /\.(js|jsx)?$/,
          loader: 'babel',
          //TODO: replace query with value from config
          query: {
            presets: ['es2015', 'react', 'stage-0'],
            plugins: ["transform-decorators-legacy"]
          },
          include: config.paths.src(),
          exclude: /node_modules/
        },
        { test: /\.json$/, loader: 'json-loader' },
        { test: /\.scss$/, 
          loader: ExtractSCSS.extract(['css', 'sass']) },
        { test: /\.css$/,
          loader: ExtractCSS.extract(['css']) },
        { test: /\.(jpe?g|png|gif|svg)$/i,
          loaders: [
            'file?hash=sha512&digest=hex&name=[hash].[ext]',
            'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
          ] },
        { test: /\.(ttf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
          loader: 'file' },
        { test: /\.json$/,
          loader: 'json',
          exclude: /node_modules/
        }
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
      compress: {
        unused: true,
        dead_code: true,
        warnings: false
      }
    })
  )
}

module.exports = webpackConfig

