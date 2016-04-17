'use strict'

const chai = require('chai')
const expect = chai.expect
const path = require('path')

const ameService = require(path.resolve(__dirname, '..', '..', '..', 'app', 'ame', 'AmeService.js'))

let messageStore = require(path.resolve(__dirname, '..', '..', '..', 'app', 'messages', 'MessageStore.js'))

describe('AmeService', () => {

  it('is defined', () => {
    expect(ameService).to.be.defined
    expect(messageStore).to.be.defined
  })


  describe('vote', () => {

    const vote = {
      messageGuid: 'ABCD-1234',
      authorEmail: 'johny@walker.com'
    }

    let message

    beforeEach(() => {
      message = ameService.addVote(vote)
    })

    afterEach(() => {
      messageStore.findByGuid('ABCD-1234').votes = []
    })

    it('is added to correct message', () => {
      expect(message.guid).to.be.equal('ABCD-1234')
      expect(message.votes).to.be.defined
      expect(message.votes).to.be.an.array
      expect(message.votes).to.be.have.length(1)
      expect(message.votes[0]).to.be.equal('johny@walker.com')
    })

    it('is not added twice', () => {
      ameService.addVote(vote)

      expect(message.votes).to.be.have.length(1)
    })

  })

})
