'use strict'

const webpack = require('webpack')
const webpackConfig = require('../config/webpack.config.dev.server')
const config = require('../config/project.config')
const debug = require('debug')('app:bin:compile')

const webpackCompiler = (webpackConfig) => 
  new Promise( (resolve, reject) => {
    const compiler = webpack(webpackConfig)

    compiler.run( (err, stats) => {
      if (err) {
        debug('Webpack compiler encountered a fatal error.', err)
        return reject(err)
      }

      const jsonStats = stats.toJson()
      
      debug('Webpack compile completed.')
      debug(stats.toString(config.compiler_stats))

      if (jsonStats.errors.length > 0) {
        debug('Webpack compiler encountered errors.')
        debug(jsonStats.errors.join('\n'))
        return reject(new Error('Webpack compiler encountered errors'))
      } else if (jsonStats.warnings.length > 0) {
        debug('Webpack compiler encountered warnings.')
        debug(jsonStats.warnings.join('\n'))
      }

      resolve(jsonStats)
    })
  })


const compile = () => {
  debug('Starting compiler.')
  return Promise.resolve()
    .then( () => webpackCompiler(webpackConfig))
    .then( stats => {
      if (stats.warnings.length && config.compiler_fail_on_warning) {
        throw new Error('compiler_fail_on_warning is enabled, exiting build.')
      }
    })
    .then( () => {
      debug('Build success.')
    })
    .catch( err => {
      debug('Compiler encountered an error.', err)
      process.exit(1)
    })
}

compile()
