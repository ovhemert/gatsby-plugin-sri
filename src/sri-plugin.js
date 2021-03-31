'use strict'

const crypto = require('crypto')
const fs = require('fs')
const glob = require('glob')
const path = require('path')
const replace = require('replace-in-file')
const util = require('util')

const defaultOptions = {
  hash: 'sha512',
  extensions: ['css', 'js'],
  crossorigin: false,
  pathPrefix: ''
}

const globAsync = util.promisify(glob)

async function onPostBuild (args, pluginOptions) {
  const options = { ...defaultOptions, ...pluginOptions }
  const fileBasePath = path.join(process.cwd(), 'public')
  const patternExt = (options.extensions.length > 1) ? `{${options.extensions.join(',')}}` : options.extensions[0]
  const pattern = `**/*.${patternExt}`

  const assets = await globAsync(pattern, { cwd: fileBasePath, nodir: true })
  const assetHashes = assets.reduce((prev, curr) => {
    const content = fs.readFileSync(path.join(fileBasePath, curr), 'utf8')
    const assetHash = crypto.createHash(options.hash).update(content, 'utf-8').digest('base64')
    prev[`${options.pathPrefix}/${curr}`] = `${options.hash}-${assetHash}`
    return prev
  }, {})

  const replaceOptions = Object.keys(assetHashes).reduce((prev, curr) => {
    const hash = assetHashes[curr]
    const crossorigin = (options.crossorigin) ? ' crossorigin="anonymous"' : ''
    const addition = `integrity="${hash}"${crossorigin}`
    if (curr.endsWith('.css')) { prev.from.push(`data-href="${curr}"`); prev.to.push(`data-href="${curr}" ${addition}`) }
    if (curr.endsWith('.js')) {
      prev.from.push(`src="${curr}"`)
      prev.to.push(`src="${curr}" ${addition}`)

      prev.from.push(`href="${curr}"`)
      prev.to.push(`href="${curr}" ${addition}`)
    }
    return prev
  }, { files: ['public/**/*.html'], from: [], to: [] })

  replace.sync(replaceOptions)
}

exports.onPostBuild = onPostBuild
