'use strict'

const chai = require('chai')
const expect = chai.expect
const path = require('path')

const dashboardService = require(path.resolve(__dirname, '..', '..', '..', 'app', 'dashboard', 'DashboardService.js'))

describe('DashboardService', () => {

  it('is defined', () => {
    expect(dashboardService).to.be.defined
  })


  describe('stats', () => {

    let topTenMessages

    beforeEach(() => {
      topTenMessages = dashboardService.stats().topTen
    })

    it('counts TOP ten', () => {
      expect(topTenMessages).to.be.an('array')
      expect(topTenMessages).to.have.length.most(10)
    })

  })

})
