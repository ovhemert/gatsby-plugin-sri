'use strict'

const hash = require('hash.js')
const replace = require('replace-in-file')

let assetHashes = {}

class WebpackPlugin {
  afterOptimizeAssets (assets) {
    Object.keys(assets).filter(file => file.endsWith('.js')).forEach(file => {
      // hash the current asset source and save the value for later use
      const asset = assets[file]
      const content = asset.source()
      const fileHash = hash.sha512().update(content).digest('hex')
      assetHashes[`/${file}`] = `sha512-${fileHash}`
    })
  }
  afterPlugins (compiler) {
    compiler.hooks.thisCompilation.tap('PluginSRI', this.thisCompilation.bind(this))
  }
  apply (compiler) {
    compiler.hooks.afterPlugins.tap('PluginSRI', this.afterPlugins.bind(this))
  }
  thisCompilation (compilation) {
    compilation.hooks.afterOptimizeAssets.tap('PluginSRI', this.afterOptimizeAssets.bind(this))
  }
}

function onPostBuild (args, pluginOptions) {
  // after html files have been generated, inject integrity attribute
  let replaceFrom = []
  let replaceTo = []
  Object.keys(assetHashes).map(file => {
    const hash = assetHashes[file]
    replaceFrom.push(`src="${file}"`)
    replaceTo.push(`src="${file}" integrity="${hash}"`)
  })
  let options = { files: 'public/*.html', from: replaceFrom, to: replaceTo }
  replace.sync(options)
  // console.log(changes)
}

module.exports.WebpackPlugin = WebpackPlugin
module.exports.onPostBuild = onPostBuild
