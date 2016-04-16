'use strict'

const guid = require('guid')

const messageStore = require('./MessageStore.js')

function create(message) {
  if (!message.guid) {
    message.guid = guid.raw()
  }
  return messageStore.addMessage(message)
}

function get() {
  return messageStore.getMessages()
}

module.exports = {
  create: create,
  get: get
}
