import { MAX_CUSTOM_VIBES, VIBE_SUGGESTIONS } from './tripOptions.js'

export function toggleVibe(vibes, name) {
  return vibes.includes(name) ? vibes.filter((v) => v !== name) : [...vibes, name]
}

export function addVibe({ vibes, customVibes }, text) {
  const word = text.trim().replace(/\s+/g, ' ')
  if (!word) return { vibes, customVibes }
  const low = word.toLowerCase()

  const suggestion = VIBE_SUGGESTIONS.find((n) => n.toLowerCase() === low)
  if (suggestion) {
    return { vibes: vibes.includes(suggestion) ? vibes : [...vibes, suggestion], customVibes }
  }
  if (customVibes.some((v) => v.toLowerCase() === low)) return { vibes, customVibes }
  if (customVibes.length >= MAX_CUSTOM_VIBES) return { vibes, customVibes }
  return { vibes, customVibes: [...customVibes, word] }
}

export function removeCustomVibe(customVibes, word) {
  return customVibes.filter((v) => v !== word)
}

export function allVibes({ vibes, customVibes }, pendingText = '') {
  const pending = pendingText.trim()
  return [...vibes, ...customVibes, ...(pending ? [pending] : [])]
}
