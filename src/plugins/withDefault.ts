import { StoreEntry } from '../types'
import { Lazy, flow } from 'fp-ts/lib/function'
import { O } from '../utils/fp'

const withDefault = <A>(onNone: Lazy<A>) => (a: StoreEntry<A>) => ({
  ...a,
  get: flow(
    a.get,
    O.getOrElse(onNone),
  ),
})

export default withDefault
