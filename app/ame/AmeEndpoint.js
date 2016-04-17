'use strict'

const ameService = require('./AmeService.js')

const ENDPOINT = '/ame'

function register(app) {
  app.get(ENDPOINT, _http405)
  app.post(ENDPOINT, _post)
  app.put(ENDPOINT, _http405)
  app.delete(ENDPOINT, _http405)
}

function _post(req, res) {
  const authorEmail = req.body.authorEmail
  const messageGuid = req.body.messageGuid

  if (!authorEmail || !messageGuid) {
    _http400(req, res)
    return
  }

  const vote = {
    authorEmail: authorEmail,
    messageGuid: messageGuid
  }

  const message = ameService.addVote(vote)
  if (!message) {
    _http400(req, res)
    return
  }

  res
    .type('application/json')
    .status(200)
    .send(message)
}

function _http405(req, res) {
  res
    .type('application/json')
    .sendStatus(405)
    .send()
}

function _http400(req, res) {
  res
  .type('application/json')
  .status(400)
  .send()
}

module.exports = {
  register: register
}
