# kv-ts

## Features

- functional key-value storage interface
- runtime type-safe with io-ts's codec
- observable support with RxJS

## Create Entry

```typescript
import * as O from 'fp-ts/lib/Option'
import * as t from 'io-ts'
import { initEntry, LOCAL_STORAGE_STORE } from 'kv-ts'

// Init Entry for store
const entry = initEntry({
  key: 'key',
  codec: t.string,
  store: LOCAL_STORAGE_STORE,
}) // StoreEntry<A>

// Use the Entry
entry.set('hello world') // (a: A) => void
entry.get() // () => O.Option<A>
entry.clear() // () => void
entry.observe() // () => Observable<O.Option<A>>
```

type of `StoreEntry<A>` is derived by the io-ts's codec `t.Type<A>`.  
you can store any type supported in typescript by defining codec, they would be (encode as/decode from) JSON string in runtime to get in touch with the `store`.

## Apply expiry

Sometimes we need to store values with expire time, (for example, for cache usage). `initEntryWithExpiry` can do this for you automatically.

```typescript
import { initEntryWithExpiry, LOCAL_STORAGE_STORE } from 'kv-ts'

const entry = initEntryWithExpiry({
  key: 'key',
  codec: t.string,
  store: LOCAL_STORAGE_STORE,
  expiry: 2000, // unit: mileseconds
})
```

When `entry.set` is called and 2 seconds passed, `entry.get` then can only retrieve `O.none`.

## withDefault

you can create an Entry with default value:

```typescript
import { pipe } from 'fp-ts/lib/pipeable'
import { initEntry, LOCAL_STORAGE_STORE, withDefault } from 'kv-ts'

const entry = pipe(
  initEntry({ key: 'key', codec: t.string, store: LOCAL_STORAGE_STORE }),
  withDefault(() => 'a'),
)
// Use the Entry
entry.set('hello world') // (a: A) => void
entry.get() // () => A
entry.clear() // () => void
entry.observe() // () => Observable<A>
```

## Custom store

store does not define the storage itself, it defined how we do IO with the key-value storage in a minimum way.

```typescript
export interface Store {
  /** get string for key */
  get: (k: string) => O.Option<string>
  /** set string for key */
  set: (k: string, a: string) => void
  /** delete string for key */
  clear: (k: string) => void
}
```

The lib includes several pre-defined `store`:

- LOCAL_STORAGE_STORE
- SESSION_STORAGE_STORE

here is how the `LOCAL_STORAGE_STORE` is implemented:

```typescript
import * as O from 'fp-ts/lib/Option'
import { pipe } from 'fp-ts/lib/pipeable'

export const LOCAL_STORAGE_STORE: Store = {
  get: (k: string) =>
    pipe(
      localStorage.getItem(k),
      O.fromNullable,
    ),
  set: (k: string, a: string) => localStorage.setItem(k, a),
  clear: (k: string) => localStorage.removeItem(k),
}
```

That is to say, you can define any `store` you are using by implementing these three functions.
