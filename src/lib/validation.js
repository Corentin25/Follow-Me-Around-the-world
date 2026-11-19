import { allVibes } from './vibes.js'

export const API_KEY_PATTERN = /^AIza[0-9A-Za-z_-]{35}$/

export function getApiKeyError(key) {
  const k = key.trim()
  if (!k) return 'Colle ta clé API pour continuer.'
  if (!API_KEY_PATTERN.test(k)) {
    return 'Cette clé ne ressemble pas à une clé Google AI Studio (elle commence par « AIza » et fait 39 caractères).'
  }
  return ''
}

export function isStepValid(step, form, pendingVibe = '') {
  if (step === 1) return form.destination.trim().length > 0
  if (step === 4) return allVibes(form, pendingVibe).length > 0
  return true
}
