import { allVibes } from './vibes.js'

export const API_KEY_MIN_LENGTH = 20
export const API_KEY_MAX_LENGTH = 200
export const API_KEY_PATTERN = /^[A-Za-z0-9._-]+$/

export function getApiKeyError(key) {
  const k = key.trim()
  if (!k) return 'Colle ta clé Google AI Studio pour continuer.'
  if (k.length < API_KEY_MIN_LENGTH || k.length > API_KEY_MAX_LENGTH || !API_KEY_PATTERN.test(k)) {
    return `Cette clé ne ressemble pas à une clé Google AI Studio : elle doit faire entre ${API_KEY_MIN_LENGTH} et ${API_KEY_MAX_LENGTH} caractères, sans espace, avec uniquement des lettres, des chiffres, « . », « _ » ou « - ».`
  }
  return ''
}

export function isStepValid(step, form, pendingVibe = '') {
  if (step === 1) return form.destination.trim().length > 0
  if (step === 4) return allVibes(form, pendingVibe).length > 0
  return true
}
