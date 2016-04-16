'use strict'

const mori = require('mori')
const path = require('path')

const initialData = require(path.resolve(__dirname, '..', '..', 'data', 'messages.json'))
let messages = mori.list()

function getMessages() {
  return messages
}

function addMessage(message) {
  messages = mori.conj(messages, message)
}

// init
(() => {
  messages = mori.into(messages, initialData)
})()

module.exports = {
  addMessage: addMessage,
  getMessages: getMessages
}
