'use strict'

const crypto = require('crypto')
const replace = require('replace-in-file')

let assetHashes = {}

class WebpackPlugin {
  constructor (options) {
    this.options = options
  }
  afterOptimizeAssets (assets) {
    Object.keys(assets).forEach(file => {
      if (file.endsWith('.css') || file.endsWith('.js')) {
        // hash the current asset source and save the value for later use
        const asset = assets[file]
        const content = asset.source()
        const hash = this.options.hash
        var fileHash = crypto.createHash(hash).update(content, 'utf-8').digest('base64')
        assetHashes[`/${file}`] = `${hash}-${fileHash}`
        // console.log(file)
      }
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
    if (file.endsWith('.css')) {
      replaceFrom.push(`data-href="${file}"`)
      replaceTo.push(`data-href="${file}" integrity="${hash}"`)
    }
    if (file.endsWith('.js')) {
      replaceFrom.push(`src="${file}"`)
      replaceTo.push(`src="${file}" integrity="${hash}"`)
    }
  })
  let options = { files: ['public/*.html', 'public/**/*.html'], from: replaceFrom, to: replaceTo }
  replace.sync(options)
  // console.log(changes)
}

module.exports.WebpackPlugin = WebpackPlugin
module.exports.onPostBuild = onPostBuild
