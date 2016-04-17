'use strict'

const mori = require('mori')
const path = require('path')

const initialData = require(path.resolve(__dirname, '..', '..', 'data', 'messages.json'))

let messageList = mori.list()


function addMessage(message) {
  messageList = mori.conj(messageList, message)
  return messageList
}

function findByGuid(guid) {
  return mori.first(
    mori.filter(
      (message) => {
        return (message.guid === guid)
      },
      messageList
    )
  )
}

function getMessages() {
  return mori.flatten(messageList)
}

// init
(() => {
  messageList = mori.into(messageList, initialData)
})()

module.exports = {
  addMessage: addMessage,
  findByGuid: findByGuid,
  getMessages: getMessages
}
