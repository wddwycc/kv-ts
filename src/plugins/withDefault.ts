import { flow, Lazy } from 'fp-ts/lib/function'
import * as Rx from 'rxjs/operators'

import { StoreEntry } from '../types'
import { O } from '../utils/fp'

const withDefault = <A>(onNone: Lazy<A>) => (a: StoreEntry<A>) => ({
  ...a,
  get: flow(
    a.get,
    O.getOrElse(onNone),
  ),
  observe: flow(
    a.observe,
    Rx.map(O.getOrElse(onNone)),
  ),
})

export default withDefault
