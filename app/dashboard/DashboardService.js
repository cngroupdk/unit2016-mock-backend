'use strict'

const mori = require('mori')
const path = require('path')

const messageStore = require(path.resolve(__dirname, '..', 'messages', 'messageStore.js'))

function stats() {
  return {
    topTen: mori.intoArray(_topTen())
  }
}

function _topTen() {
  // TODO correct implementation
  return mori.take(10, messageStore.getMessages())
}

module.exports = {
  stats: stats
}
