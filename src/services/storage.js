const STORAGE_KEY = 'followme.apiKey'

function safely(fn, fallback) {
  try {
    return fn()
  } catch {
    return fallback
  }
}

export function loadApiKey() {
  return safely(
    () => sessionStorage.getItem(STORAGE_KEY) || localStorage.getItem(STORAGE_KEY) || '',
    '',
  )
}

export function isKeyRemembered() {
  return safely(() => localStorage.getItem(STORAGE_KEY) !== null, false)
}

export function saveApiKey(key, remember) {
  safely(() => {
    sessionStorage.setItem(STORAGE_KEY, key)
    if (remember) localStorage.setItem(STORAGE_KEY, key)
    else localStorage.removeItem(STORAGE_KEY)
  })
}

export function setRemember(remember, key) {
  safely(() => {
    if (!remember) localStorage.removeItem(STORAGE_KEY)
    else if (key) localStorage.setItem(STORAGE_KEY, key)
  })
}

export function clearApiKey() {
  safely(() => {
    sessionStorage.removeItem(STORAGE_KEY)
    localStorage.removeItem(STORAGE_KEY)
  })
}
