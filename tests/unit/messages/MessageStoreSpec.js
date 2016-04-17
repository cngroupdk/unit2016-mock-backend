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
    expect(mori.count(messages)).to.be.at.least(2)
  })


  describe('adds new message', () => {

    const message = {
      guid: 'XYZW-9876'
    }
    let originalMessages
    let messages = undefined

    beforeEach(() => {
      originalMessages = messageStore.getMessages()
      messages = messageStore.addMessage(message)
    })

    it('increases size of message list', () => {
      expect(
        mori.count(messages)
      ).to.be.equal(
        1 + mori.count(originalMessages)
      )
    })

    it('contains the new message', () => {
      expect(mori.find(messages, message)).to.be.truthy
    })

  })


  describe('finds message', () => {

    let message

    beforeEach(() => {
      message = messageStore.findByGuid('ABCD-1234')
    })

    it('by GUID', () => {
      expect(message).to.be.defined
      expect(message.guid).to.be.equal('ABCD-1234')
    })

  })


  describe('does not find message', () => {

    let message

    beforeEach(() => {
      message = messageStore.findByGuid('really-not-existing-guid')
    })

    it('by GUID', () => {
      expect(message).not.to.be.defined
    })

  })

})
