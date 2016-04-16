'use strict'

const mori = require('mori')
const path = require('path')

const initialData = require(path.resolve(__dirname, '..', '..', 'data', 'messages.json'))
let messageList = mori.list()

function getMessages() {
  return mori.flatten(messageList)
}

function addMessage(message) {
  messageList = mori.conj(messageList, message)
  return messageList
}

// init
(() => {
  messageList = mori.into(messageList, initialData)
})()

module.exports = {
  addMessage: addMessage,
  getMessages: getMessages
}
