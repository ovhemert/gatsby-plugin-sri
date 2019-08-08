'use strict'

const sriPlugin = require('./src/sri-plugin')

exports.onPostBuild = sriPlugin.onPostBuild
