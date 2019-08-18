import { Store } from './types'
import { O, pipe } from './utils/fp'

export const LOCAL_STORAGE_STORE: Store = {
  get: (k: string) =>
    pipe(
      localStorage.getItem(k),
      O.fromNullable,
    ),
  set: (k: string, a: string) => localStorage.setItem(k, a),
}

export const SESSION_STORAGE_STORE: Store = {
  get: (k: string) =>
    pipe(
      sessionStorage.getItem(k),
      O.fromNullable,
    ),
  set: (k: string, a: string) => sessionStorage.setItem(k, a),
}
