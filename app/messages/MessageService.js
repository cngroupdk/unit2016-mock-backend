'use strict'

const guid = require('guid')

const messageStore = require('./MessageStore.js')

function create(message) {
  message.timestamp = new Date()
  if (!message.guid) {
    message.guid = guid.raw()
  }
  message.votes = []
  
  return messageStore.addMessage(message)
}

function get() {
  return messageStore.getMessages()
}

module.exports = {
  create: create,
  get: get
}
