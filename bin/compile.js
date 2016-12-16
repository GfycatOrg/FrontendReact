'use strict'

const webpack = require('webpack')
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


const compileServer = () => {
  const webpackServerConfig = require('../config/webpack.config.server')

  debug('Compile server')
  webpackCompiler(webpackServerConfig).then( stats => {
    if (stats.warnings.length && config.compiler_fail_on_warning) {
      throw new Error('compiler_fail_on_warning enabled, exit build.')
    }
    debug('Server build success.')
  }).catch( err => {
    debug('Server build failure.')
  })
}

const compileClient = () => {
  const webpackClientConfig = require('../config/webpack.config.client')

  debug('Compile client')
  webpackCompiler(webpackClientConfig).then( stats => {
    if (stats.warnings.length && config.compiler_fail_on_warning) {
      throw new Error('compiler_fail_on_warning enabled, exit build.')
    }
    debug('Client build success.', stats)
  }).catch( err => {
    debug('Client build failure.')
  })
}

// compileServer()
compileClient()
