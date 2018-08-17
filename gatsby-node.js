'use strict'

const defaultOptions = {
  hash: 'sha512',
  extensions: ['css', 'js']
}

const PluginSRI = require('./src/sri-plugin')

exports.onCreateWebpackConfig = ({ stage, getConfig, rules, loaders, actions }, pluginOptions) => {
  const options = {
    ...defaultOptions,
    ...pluginOptions
  }
  if (stage === 'build-javascript') {
    actions.setWebpackConfig({
      plugins: [
        new PluginSRI.WebpackPlugin(options)
      ]
    })
  }
}

exports.onPostBuild = PluginSRI.onPostBuild
