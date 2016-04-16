'use strict'

const mori = require('mori')

const messageService = require('./MessageService.js')

const ENDPOINT = '/messages'

function register(app) {
  app.get(ENDPOINT, _get)
  app.post(ENDPOINT, _post)
  app.put(ENDPOINT, _http405)
  app.delete(ENDPOINT, _http405)
}

function _get(req, res) {
  const messages = mori.intoArray(messageService.get())
  res
    .type('application/json')
    .status(200)
    .send(messages)
}

function _post(req, res) {
  const authorEmail = req.body.authorEmail
  const text = req.body.text

  if (!authorEmail || !text) {
    res
      .type('application/json')
      .status(400)
      .send()
    return
  }

  let message = {
    authorEmail: authorEmail,
    text: text
  }

  const messages = messageService.create(message)

  res
    .type('application/json')
    .status(200)
    .send(mori.first(messages))
}

function _http405(req, res) {
  res.sendStatus(405)
}

module.exports = {
  register: register
}
