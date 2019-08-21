/**
 * @jest-environment node
 */

import * as O from 'fp-ts/lib/Option'
import * as t from 'io-ts'

import { initEntry, initEntryWithExpiry } from '../src'
import { expectStream, mockStore, sleep } from './utils'

it('test initEntry', done => {
  const entry = initEntry({ key: 'key', codec: t.string, store: mockStore() })
  expect(entry.get()).toEqual(O.none)
  expectStream(entry.observe(), [O.some('a'), O.none], done)
  entry.set('a')
  expect(entry.get()).toEqual(O.some('a'))
  entry.clear()
  expect(entry.get()).toEqual(O.none)
}, 2000)

it('test initEntryWithExpiry', async () => {
  const entry = initEntryWithExpiry({
    key: 'key',
    codec: t.string,
    store: mockStore(),
    expiry: 2000,
  })
  expect(entry.get()).toEqual(O.none)
  entry.set('a')
  expect(entry.get()).toEqual(O.some('a'))
  await sleep(2000)
  expect(entry.get()).toEqual(O.none)
})
