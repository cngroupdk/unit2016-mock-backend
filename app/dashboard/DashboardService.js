'use strict'

const mori = require('mori')
const path = require('path')

const messageStore = require(path.resolve(__dirname, '..', 'messages', 'MessageStore.js'))

function stats(start, end) {
  return {
    topTenMessages: mori.intoArray(_topTenMessages(start, end)),
    topTenAuthors: mori.intoArray(_topTenAuthors(start, end))
  }
}

function _topTenMessages(start, end) {
  const messages = messageStore.getMessages()

  return mori.take(
    10,
    mori.sort(
      (a, b) => {
        return (b.votes.length - a.votes.length)
      },
      _filterFromTo(messages, start, end)
    )
  )
}

function _topTenAuthors(start, end) {
  const messages = messageStore.getMessages()

  return mori.take(
    10,
    mori.sort(
      (a, b) => {
        return (b.votes - a.votes)
      },
      _votesIntoArray(
        _countVotes(
          _filterFromTo(messages, start, end)
        )
      )
    )
  )
}

function _votesIntoArray(votes) {
  const votesArray = Object.keys(votes)
    .map((key) => {
      return {
        authorEmail: key,
        votes: votes[key]
      }
    })

  return votesArray
}

function _countVotes(messages) {
  let votes = {}
  mori.each(
    messages,
    (messageData) => {
      if (!votes[messageData.authorEmail]) {
        votes[messageData.authorEmail] = 0
      }
      votes[messageData.authorEmail] += messageData.votes.length
    }
  )

  return votes
}

function _filterFromTo(messages, start, end) {
  return mori.filter(
    (message) => {
      const messageDate = new Date(message.timestamp)
      return (
        messageDate >= start &&
        messageDate < end
      )
    },
    messages
  )
}

module.exports = {
  stats: stats
}
