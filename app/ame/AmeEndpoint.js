'use strict'

const path = require('path')

const apiResponse = require(path.resolve(__dirname, '..', '_common', 'ApiResponse.js'))

const ameService = require('./AmeService.js')

const ENDPOINT = '/ame'

function register(app) {
  app.get(ENDPOINT, apiResponse.http405)
  app.post(ENDPOINT, _post)
  app.put(ENDPOINT, apiResponse.http405)
  app.delete(ENDPOINT, apiResponse.http405)
}

function _post(req, res) {
  const authorEmail = req.body.authorEmail
  const messageGuid = req.body.messageGuid

  if (!authorEmail || !messageGuid) {
    apiResponse.http400(req, res)
    return
  }

  const vote = {
    authorEmail: authorEmail,
    messageGuid: messageGuid
  }

  const message = ameService.addVote(vote)
  if (!message) {
    apiResponse.http400(req, res)
    return
  }

  apiResponse.http200(req, res, message)
}

module.exports = {
  register: register
}
