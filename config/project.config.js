/* eslint key-spacing: 0 spaced-comment:0 */
'use strict'

const path = require('path');
const debug = require('debug')('app:config')

debug('Creating default project configuration')

/**
 *  Default configuration
 */

const config = {
  env: process.env.NODE_ENV || 'development',

  /**
   *  Project structure
   */
  path_base: path.resolve(__dirname, '..'),
  dir_dist: 'dist',
  dir_public: 'dist/public',
  dir_src: 'src',

  /**
   *  Server configuration
   */
  server_host: 'localhost',
  server_port: process.env.PORT || 3000,

  /**
   *  Compiler (Webpack, Babel) variables
   */
  compiler_babel: {
    cacheDirectory: true,
    plugins: ['transform-decorators-legacy'],
    presets: ['es2015', 'react', 'stage-0']
  },
  compiler_devtool: 'source-map',
  compiler_hash_type: 'hash',
  compiler_fail_on_warning: false,
  compiler_quiet: false,
  compiler_public_path: '/',
  compiler_stats: {
    chunks: false,
    chunkModules: false,
    colors: true
  },
  compiler_vendors: ['react', 'react-redux', 'react-router', 'redux']
}


/**
 *  Internal configurations
 */
config.globals = {
  'process.env': {
    'NODE_ENV': JSON.stringify(config.env)
  },
  'NODE_ENV': config.env,
  '__DEV__': config.env === 'development',
  '__PROD__': config.env === 'production',
  '__BASENAME__': JSON.stringify(process.env.BASENAME || '')
}


/**
 *  Validate vendor dependencies from package.json
 */
const pkg = require('../package.json')

config.compiler_vendors = config.compiler_vendors.filter( (dep) => {
  if (pkg.dependencies[dep]) return true

  debug(`Package "${dep}" was not found in package.json and will not be included in the webpack vendor bundle.`)
})


/**
 *  Utilities
 */
function base() {
  const args = [config.path_base].concat([].slice.call(arguments))
  return path.resolve.apply(path, args)
}

config.paths = {
  base: base,
  src: base.bind(null, config.dir_src),
  public: base.bind(null, config.dir_public),
  dist: base.bind(null, config.dir_dist)
}


/**
 *  Environment overrides
 */
debug(`Looking for environment overrides for NODE_ENV "${config.env}".`)

const environments = require('./environments.js')
const overrides = environments[config.env]

if (overrides) {
  debug('Found overrides, applying to default configuration.')
  Object.assign(config, overrides(config))
} else {
  debug('No environment overrides found, default will be used.')
}

module.exports = config

