import { constTrue } from 'fp-ts/lib/function'
import * as t from 'io-ts'

import { InitEntryPayload, InitEntryWithExpiryPayload } from '../types'
import initEntryFactory from './factory'

const initEntry = <A>(payload: InitEntryPayload<A>) =>
  initEntryFactory({
    wrapper: {
      wrap: (a: A) => ({ value: a }),
      unwrap: ({ value }) => value,
      wrapCodec: a => t.interface({ value: a }),
    },
    validate: constTrue,
  })(payload)

const initEntryWithExpiry = <A>(payload: InitEntryWithExpiryPayload<A>) =>
  initEntryFactory({
    wrapper: {
      wrap: (a: A) => ({ value: a, expiredAt: Date.now() + payload.expiry }),
      unwrap: ({ value }) => value,
      wrapCodec: a => t.interface({ value: a, expiredAt: t.number }),
    },
    validate: ({ expiredAt }) => expiredAt > Date.now(),
  })(payload)

export { initEntry, initEntryWithExpiry }
