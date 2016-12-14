const path = require('path')
const webpack = require('webpack')

module.exports = {
  devtool: 'sourcemap-map',

  entry: [
    './src/client'
  ],

  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },

  plugins: [
    // Set NODE_ENV to production on compile time for minified version of react and redux on production
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false
      }
    })
  ],

  module: {
    loaders: [
      { test: /\.(js|jsx)?$/,
        loader: 'babel',
        exclude: /node_modules/,
        include: path.resolve(__dirname, '../src'),
        query: {
          presets: ['es2015', 'react', 'stage-0']
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
        loader: 'json' }
    ]
  }
}
