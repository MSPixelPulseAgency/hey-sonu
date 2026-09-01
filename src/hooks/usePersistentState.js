import { useEffect, useState } from 'react'
import { readStoredValue, writeStoredValue } from '../lib/choices'

function getBrowserStorage() {
  return typeof window === 'undefined' ? null : window.localStorage
}

export function usePersistentState(key, fallback, storageOverride) {
  const storage = storageOverride === undefined ? getBrowserStorage() : storageOverride
  const [value, setValue] = useState(() => readStoredValue(storage, key, fallback))

  useEffect(() => {
    writeStoredValue(storage, key, value)
  }, [key, storage, value])

  return [value, setValue]
}

