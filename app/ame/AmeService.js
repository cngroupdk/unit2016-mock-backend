'use strict'

const path = require('path')

const messageStore = require(path.resolve(__dirname, '..', 'messages', 'messageStore.js'))

function addVote(vote) {
  const message = messageStore.findByGuid(vote.messageGuid)

  if (!message) {
    return null
  }

  if (!message.votes) {
    message.votes = []
  }

  const voteExists = message.votes.some((v) => {
    return v === vote.authorEmail
  })

  if (!voteExists) {
    message.votes.push(vote.authorEmail)
  }

  return message
}

module.exports = {
  addVote: addVote
}
