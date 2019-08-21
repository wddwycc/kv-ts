import { LOCAL_STORAGE_STORE, SESSION_STORAGE_STORE } from './consts'
import { initEntry, initEntryWithExpiry } from './entry'
import { withDefault } from './plugins'
import './types'

export {
  initEntry,
  initEntryWithExpiry,
  withDefault,
  LOCAL_STORAGE_STORE,
  SESSION_STORAGE_STORE,
}
