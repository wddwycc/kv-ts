/**
 * @jest-environment jsdom
 */

import * as O from 'fp-ts/lib/Option'
import * as t from 'io-ts'

import { initEntry, LOCAL_STORAGE_STORE, SESSION_STORAGE_STORE } from '../src'
import { expectStream } from './utils'

it('test LOCAL_STORAGE_STORE', done => {
  const entry = initEntry({
    key: 'key',
    codec: t.string,
    store: LOCAL_STORAGE_STORE,
  })
  expect(entry.get()).toEqual(O.none)
  expectStream(entry.observe(), [O.some('a'), O.none], done)
  entry.set('a')
  expect(entry.get()).toEqual(O.some('a'))
  entry.clear()
  expect(entry.get()).toEqual(O.none)
}, 2000)

it('test SESSION_STORAGE_STORE', done => {
  const entry = initEntry({
    key: 'key',
    codec: t.string,
    store: SESSION_STORAGE_STORE,
  })
  expect(entry.get()).toEqual(O.none)
  expectStream(entry.observe(), [O.some('a'), O.none], done)
  entry.set('a')
  expect(entry.get()).toEqual(O.some('a'))
  entry.clear()
  expect(entry.get()).toEqual(O.none)
}, 2000)
