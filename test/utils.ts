import * as O from 'fp-ts/lib/Option'
import { Observable } from 'rxjs'

import { Store } from '../src/types'

export const sleep = (timeout: number) =>
  new Promise(resolve => setTimeout(() => resolve(undefined), timeout))

export const mockStore = (): Store => {
  let dict: { [key: string]: string } = {}
  const get = (k: string) => O.fromNullable(dict[k])
  const set = (k: string, a: string) => {
    dict[k] = a
  }
  const clear = (k: string) => {
    delete dict[k]
  }
  return { get, set, clear }
}

export const expectStream = (
  stream: Observable<any>,
  expected: any[],
  done: () => void,
) => {
  let counter = 0
  stream.subscribe({
    next: a => {
      if (counter < expected.length) {
        expect(a).toEqual(expected[counter])
      }
      ++counter
      if (counter === expected.length) done()
    },
  })
}
