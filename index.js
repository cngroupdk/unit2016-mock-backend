'use strict'

const bodyParser = require('body-parser')
const express = require('express')
const path = require('path')

const ameEndpoint = require(path.resolve('app', 'ame', 'AmeEndpoint.js'))
const messageEndpoint = require(path.resolve('app', 'messages', 'MessageEndpoint.js'))

let app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

ameEndpoint.register(app)
messageEndpoint.register(app)

app.listen(8888, () => {
  console.log('Web-app listening at port 8888')
})
