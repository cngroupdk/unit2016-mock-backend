'use strict'

const mori = require('mori')
const path = require('path')

const apiResponse = require(path.resolve(__dirname, '..', '_common', 'ApiResponse.js'))

const messageService = require('./MessageService.js')

const ENDPOINT = '/messages'

function register(app) {
  app.get(ENDPOINT, _list)
  app.post(ENDPOINT, _post)
  app.put(ENDPOINT, apiResponse.http405)
  app.delete(ENDPOINT, apiResponse.http405)
}

function _list(req, res) {
  const messages = mori.intoArray(messageService.get())
  apiResponse.http200(req, res, messages)
}

function _post(req, res) {
  const authorEmail = req.body.authorEmail
  const text = req.body.text

  if (!authorEmail || !text) {
    apiResponse.http400(req, res)
    return
  }

  const message = {
    authorEmail: authorEmail,
    text: text
  }

  const messages = messageService.create(message)

  apiResponse.http200(req, res, mori.first(messages))
}

module.exports = {
  register: register
}
