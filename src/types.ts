import * as t from 'io-ts'

import { O } from './utils/fp'
import { Observable } from 'rxjs'

export interface Store {
  /** get string for key */
  get: (k: string) => O.Option<string>
  /** set string for key */
  set: (k: string, a: string) => void
  /** delete string for key */
  clear: (k: string) => void
}

export interface StoreEntry<A> {
  get: () => O.Option<A>
  set: (a: A) => void
  clear: () => void
  observe: () => Observable<O.Option<A>>
}

export interface DataWrapper<A, Wrapped> {
  wrap: (a: A) => Wrapped
  unwrap: (a: Wrapped) => A
  wrapCodec: (a: t.Type<A>) => t.Type<Wrapped>
}

export interface InitEntryFactoryPayload<A, Wrapped> {
  wrapper: DataWrapper<A, Wrapped>
  validate: (a: Wrapped) => boolean
}

export interface InitEntryPayload<A> {
  /** key used in key-value storage */
  key: string
  /** codec used to validate data type */
  codec: t.Type<A>
  /** IO entry */
  store: Store
}

export interface InitEntryWithExpiryPayload<A> extends InitEntryPayload<A> {
  /** expiration time, in mileseconds */
  expiry: number
}
