'use strict'

const PluginSRI = require('./src/sri-plugin')

exports.onCreateWebpackConfig = ({ stage, getConfig, rules, loaders, actions }) => {
  if (stage === 'build-javascript') {
    actions.setWebpackConfig({
      plugins: [
        new PluginSRI.WebpackPlugin()
      ]
    })
  }
}

exports.onPostBuild = PluginSRI.onPostBuild
