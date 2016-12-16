'use strict'

/**
 *  Define environment specific values to override default configuration with
 */
module.exports = {
  /**
   *  NOTE: In development, we use an explicit public path when the assets
   *  are served by webpack to ensure <link> tag href urls resolve properly:
   *
   *  http://stackoverflow.com/questions/34133808/webpack-ots-parsing-error-loading-fonts/34133809#34133809
   */
  development: (config) => ({
    compiler_public_path: `http://${config.serer_host}:${config.server_port}/`
  }),

  production: (config) => ({
    compiler_public_path: '/static',
    compiler_fail_on_warning: false,
    compiler_hash_type: 'chunkhash',
    compiler_devtool: null,
    compiler_stats: {
      chunks: true,
      chunkModules: true,
      colors: true
    }
  })
}

