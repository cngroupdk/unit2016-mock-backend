'use strict'

const path = require('path')

const apiResponse = require(path.resolve(__dirname, '..', '_common', 'ApiResponse.js'))

const dashboardService = require('./DashboardService.js')

const ENDPOINT = '/dashboard/:year/:month/:day'

const milisPerDay = 86400000
const dayShiftMilis = milisPerDay - 1
const weekShiftMilis = 7 * milisPerDay - 1

function register(app) {
  app.get(ENDPOINT, _get)
  app.post(ENDPOINT, apiResponse.http405)
  app.put(ENDPOINT, apiResponse.http405)
  app.delete(ENDPOINT, apiResponse.http405)
}

function _get(req, res) {
  const dayStart = new Date(
    req.params.year,
    req.params.month - 1,
    req.params.day
  )

  const dayEnd = _getDayEnd(dayStart)
  const weekEnd = _getWeekEnd(dayStart)

  console.log(weekEnd)

  const dayStats = dashboardService.stats(
    dayStart,
    dayEnd
  )
  const weekStats = dashboardService.stats(
    dayStart,
    weekEnd
  )

  apiResponse.http200(req, res,
    {
      dayStats: dayStats,
      weekStats: weekStats
    }
  )
}

function _getDayEnd(date) {
  const dateMilis = date.getTime()
  return new Date(dateMilis + dayShiftMilis) //
}

function _getWeekEnd(date) {
  const dateMilis = date.getTime()
  return new Date(dateMilis + weekShiftMilis) //
}

module.exports = {
  register: register
}
