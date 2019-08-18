import { InitEntryFactoryPayload, InitEntryPayload, StoreEntry } from '../types'
import { E, O, pipe } from '../utils/fp'

const initEntryFactory = <A, Wrapped>({
  wrapper,
  validate,
}: InitEntryFactoryPayload<A, Wrapped>) => ({
  key,
  codec: _codec,
  store,
}: InitEntryPayload<A>): StoreEntry<A> => {
  const { wrap, unwrap, wrapCodec } = wrapper
  const codec = wrapCodec(_codec)
  const decodeJSONStr = (a: string) =>
    pipe(
      E.tryCatch(() => JSON.parse(a), _ => 'JSON invalid'),
      E.chain(a =>
        pipe(
          codec.decode(a),
          E.mapLeft(_ => 'type invalid'),
        ),
      ),
      O.fromEither,
    )
  const get = () =>
    pipe(
      store.get(key),
      O.chain(decodeJSONStr),
      O.filter(validate),
      O.map(unwrap),
    )
  const set = (a: A) =>
    pipe(
      JSON.stringify(wrap(a)),
      a => store.set(key, a),
    )
  return { get, set }
}

export default initEntryFactory
