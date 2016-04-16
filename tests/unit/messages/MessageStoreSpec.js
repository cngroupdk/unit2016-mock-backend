'use strict'

const chai = require('chai')
const expect = chai.expect
const mori = require('mori')
const path = require('path')

const messageStore = require(path.resolve(__dirname, '..', '..', '..', 'app', 'messages', 'MessageStore.js'))

describe('MessageStore', () => {

  it('is defined', () => {
    expect(messageStore).is.defined
  })

  it('contains inital data', () => {
    const messages = messageStore.getMessages()
    expect(mori.count(messages)).to.be.equal(2)
  })

  describe('adds new message', () => {

    const message = {
      guid: 'XYZW-9876'
    }
    let messages = undefined

    beforeEach(() => {
      messageStore.addMessage(message)
      messages = messageStore.getMessages()
    })

    it('increases size', () => {
      expect(mori.count(messages)).to.be.equal(3)
    })

    it('contains the new message', () => {
      expect(mori.find(messages, message)).to.be.truthy
    })

  })

})
