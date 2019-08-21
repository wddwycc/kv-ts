/**
 * @jest-environment node
 */

import { pipe } from 'fp-ts/lib/pipeable'
import * as t from 'io-ts'

import { initEntry, withDefault } from '../src'
import { expectStream, mockStore } from './utils'

it('test withDefault', done => {
  const entry = pipe(
    initEntry({ key: 'key', codec: t.string, store: mockStore() }),
    withDefault(() => 'a'),
  )
  expect(entry.get()).toEqual('a')
  expectStream(entry.observe(), ['b', 'a'], done)
  entry.set('b')
  expect(entry.get()).toEqual('b')
  entry.clear()
  expect(entry.get()).toEqual('a')
}, 2000)
