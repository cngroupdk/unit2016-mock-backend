'use strict'

const chai = require('chai')
const expect = chai.expect
const mori = require('mori')
const path = require('path')

const dashboardService = require(path.resolve(__dirname, '..', '..', '..', 'app', 'dashboard', 'DashboardService.js'))

describe('DashboardService', () => {

  it('is defined', () => {
    expect(dashboardService).to.be.defined
  })


  describe('top 10 messages for 1 day', () => {

    const start = new Date('2016-04-18T00:00:00.000Z')
    const end = new Date('2016-04-18T23:59:59.999Z')

    let topTenMessages

    beforeEach(() => {
      topTenMessages = dashboardService.stats(start, end).topTenMessages
    })

    it('counts TOP ten', () => {
      expect(topTenMessages).to.be.an.array
      expect(topTenMessages).to.have.length.most(10)
    })

    it('counts most "a\'med" per day at top', () => {
      const topMessage = mori.first(topTenMessages)
      expect(topMessage.votes).to.have.length(4)
    })

  })


  describe('top 10 messages for 1 week', () => {

    const start = new Date('2016-04-12T00:00:00.000Z')
    const end = new Date('2016-04-19T23:59:59.999Z')

    let topTenMessages

    beforeEach(() => {
      topTenMessages = dashboardService.stats(start, end).topTenMessages
    })

    it('counts TOP ten', () => {
      expect(topTenMessages).to.be.an.array
      expect(topTenMessages).to.have.length.most(10)
    })

    it ('counts most "a\'med" per week at top', () => {
      const topMessage = mori.first(topTenMessages)
      expect(topMessage.votes).to.have.length(15)
    })

  })


  describe('top 10 authors for 1 day', () => {

    const start = new Date('2016-04-18T00:00:00.000Z')
    const end = new Date('2016-04-18T23:59:59.999Z')

    let topTenAuthors

    beforeEach(() => {
      topTenAuthors = dashboardService.stats(start, end).topTenAuthors
    })

    it('counts TOP ten', () => {
      expect(topTenAuthors).to.be.an.array
      expect(topTenAuthors).to.have.length.most(10)
    })

    it('counts most "a\'med" per day at top', () => {
      const topAuthor = mori.first(topTenAuthors)
      expect(topAuthor.authorEmail).to.be.equal('jane@doe.com')
      expect(topAuthor.votes).to.have.length.equal(9)
    })

  })


  describe('top 10 authors for 1 week', () => {

    const start = new Date('2016-04-12T00:00:00.000Z')
    const end = new Date('2016-04-19T23:59:59.999Z')

    let topTenAuthors

    beforeEach(() => {
      topTenAuthors = dashboardService.stats(start, end).topTenAuthors
    })

    it('counts TOP ten', () => {
      expect(topTenAuthors).to.be.an.array
      expect(topTenAuthors).to.have.length.most(10)
    })

    it ('counts most "a\'med" per day at top', () => {
      const topAuthor = mori.first(topTenAuthors)
      expect(topAuthor.authorEmail).to.be.equal('jessie@doe.com')
      expect(topAuthor.votes).to.have.length.equal(16)
    })

  })


})
