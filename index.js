'use strict'

const bodyParser = require('body-parser')
const express = require('express')
const path = require('path')

const ameEndpoint = require(path.resolve('app', 'ame', 'AmeEndpoint.js'))
const dashboardEndpoint = require(path.resolve('app', 'dashboard', 'DashboardEndpoint.js'))
const messageEndpoint = require(path.resolve('app', 'messages', 'MessageEndpoint.js'))

const appPort = process.env.PORT || 8888

let app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

ameEndpoint.register(app)
dashboardEndpoint.register(app)
messageEndpoint.register(app)

app.listen(appPort, () => {
  console.log('Web-app listening at port ' + appPort)
})
