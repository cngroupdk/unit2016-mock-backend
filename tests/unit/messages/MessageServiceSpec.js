'use strict'

const chai = require('chai')
const expect = chai.expect
const mori = require('mori')
const path = require('path')
const sinon = require('sinon')

const guid = require('guid')
const messageService = require(path.resolve(__dirname, '..', '..', '..', 'app', 'messages', 'MessageService.js'))
const messageStore = require(path.resolve(__dirname, '..', '..', '..', 'app', 'messages', 'MessageStore.js'))

describe('MessageService', () => {

  it('is defined', () => {
    expect(messageService).is.defined
  })

  it('returns stored messages', () => {
    expect(
      mori.count(messageService.get())
    ).to.be.equal(
      mori.count(messageStore.getMessages())
    )
  })

  describe('creates new message without GUID', () => {

    const message = {
      authorEmail: 'john@doe.com',
      text: 'Hello world'
    }

    let messages

    beforeEach(() => {
      sinon.stub(guid, 'raw', () => {
        return 'ABCD-1234'
      })
      messages = messageService.create(message)
    })

    afterEach(() => {
      guid.raw.restore()
    })

    it('fills in missing GUID', () => {
      const newMessage = mori.first(messages)
      expect(newMessage.guid).to.be.equal('ABCD-1234')
      expect(newMessage.timestamp).to.be.defined
    })

  })


  describe('creates new message keeping the GUID', () => {

    const message = {
      guid: 'XYZW-9876',
      authorEmail: 'john@doe.com',
      text: 'Hello world'
    }

    let messages

    beforeEach(() => {
      messages = messageService.create(message)
    })

    it('keeps pre-filled GUID', () => {
      const newMessage = mori.first(messages)
      expect(newMessage.guid).to.be.equal('XYZW-9876')
      expect(newMessage.timestamp).to.be.defined
    })

  })

})
