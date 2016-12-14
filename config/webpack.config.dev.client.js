const path = require('path')
const webpack = require('webpack')

module.exports = {
  devtool: 'eval',

  entry: [
    'webpack-hot-middleware/client',
    './src/client'
  ],

  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
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
