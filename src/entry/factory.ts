import { InitEntryFactoryPayload, InitEntryPayload, StoreEntry } from '../types'
import { E, O, pipe } from '../utils/fp'
import { Subject } from 'rxjs'

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
  const subject = new Subject<O.Option<A>>()
  const set = (a: A) => {
    pipe(
      JSON.stringify(wrap(a)),
      a => store.set(key, a),
    )
    subject.next(O.some(a))
  }
  const clear = () => {
    store.clear(key)
    subject.next(O.none)
  }
  return { get, set, clear, observe: subject.asObservable }
}

export default initEntryFactory
