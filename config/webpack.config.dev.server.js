var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

const ExtractCSS = new ExtractTextPlugin('[name].css', {
  allChunks: false,
  disable: false
});

const ExtractSCSS = new ExtractTextPlugin('[name].scss', {
  allChunks: false,
  disable: false
});

module.exports = {
    // The configuration for the server-side rendering
    name: 'server-side rendering',
    // context: path.resolve(__dirname, '../src'),
    entry: {
      server: './src/server'
    },
    target: 'node',
    output: {
      // The output directory as absolute path
      path: path.resolve(__dirname, '../dist'),
      // The filename of the entry chunk as relative path inside the output.path directory
      filename: 'server.js',
      // The output path from the view of the Javascript
      publicPath: '/static/',
      libraryTarget: 'commonjs2'
    },
    plugins: [
      new webpack.optimize.OccurenceOrderPlugin(),
      ExtractCSS,
      ExtractSCSS
    ],
    module: {
      loaders: [
        {
          test: /\.(js|jsx)?$/,
          loader: 'babel',
          query: {
            presets: ['es2015', 'react', 'stage-0']
          },
          include: path.resolve(__dirname, '../src'),
          exclude: path.resolve(__dirname, '../node_modules')
        },
        { test: /\.json$/, loader: 'json-loader' },
        { test: /\.scss$/, 
          loader: ExtractSCSS.extract(['css', 'sass'])},
        { test: /\.css$/,
          loader: ExtractCSS.extract(['css'])},
        // { test: /\.scss?$/,
        //   loader: 'style!css!sass' },
        // { test: /\.css?$/,
        //   loader: 'style!css' },
        { test: /\.png$/,
          loader: 'file' },
        { test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
          loader: 'file'},
        { test: /\.json$/,
          loader: 'json'
        }
      ]
    }
};
