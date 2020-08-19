'use strict'

const fs = require('fs')
const path = require('path')
const crypto = require('crypto')
const React = require('react')

const defaultOptions = {
  hash: 'sha512',
  crossorigin: false
}

const hashes = new Map()

function getFileHash (fileName, algorithm) {
  const value = hashes.get(fileName)

  if (value !== undefined) {
    return value
  }

  const filePath = path.resolve(path.join('public', fileName))

  if (!fs.existsSync(filePath)) {
    return ''
  }

  const hash = crypto
    .createHash(algorithm)
    .update(fs.readFileSync(filePath))
    .digest('base64')

  hashes.set(fileName, hash)

  return hash
}

function visitor (elem, options) {
  let fileName = ''

  switch (elem.type) {
    case 'script': {
      fileName = elem.props.src
      break
    }

    case 'style': {
      fileName = elem.props['data-href']
      break
    }

    case 'link': {
      fileName = elem.props.href
      break
    }

    default:
      break
  }

  if (fileName) {
    const hash = getFileHash(fileName, options.hash)

    if (hash) {
      elem.props.integrity = `${options.hash}-${hash}`

      if (options.crossorigin) {
        elem.props.crossOrigin = 'anonymous'
      }
    }
  }
}

function htmlTreeTraversal (children, visitor, options) {
  React.Children.forEach(children, function forEach (elem) {
    if (
      (elem.type === 'script' && elem.props.src) ||
      (elem.type === 'style' && elem.props['data-href']) ||
      (elem.type === 'link' && elem.props.href && elem.props.href.endsWith('.js'))
    ) {
      visitor(elem, options)
    } else if (elem.props !== undefined && elem.props.children) {
      htmlTreeTraversal(elem.props.children, visitor, options)
    }
  })
}

function onPreRenderHTML (args, pluginOptions) {
  const options = { ...defaultOptions, ...pluginOptions }

  htmlTreeTraversal(args.getHeadComponents(), visitor, options)

  htmlTreeTraversal(args.getPreBodyComponents(), visitor, options)

  htmlTreeTraversal(args.getPostBodyComponents(), visitor, options)
}

exports.onPreRenderHTML = onPreRenderHTML
