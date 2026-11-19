import { describe, expect, it } from 'vitest'
import { formatRecap, pluralize } from './format.js'
import { getApiKeyError, isStepValid } from './validation.js'

const FAKE_KEY = 'AIza' + 'x'.repeat(35)

describe('getApiKeyError', () => {
  it('refuse une clé vide', () => {
    expect(getApiKeyError('   ')).toBe('Colle ta clé API pour continuer.')
  })
  it('refuse un mauvais format', () => {
    expect(getApiKeyError('abc')).toMatch(/ne ressemble pas/)
    expect(getApiKeyError(FAKE_KEY + 'x')).toMatch(/ne ressemble pas/)
  })
  it('accepte le bon format (espaces autour tolérés)', () => {
    expect(getApiKeyError(` ${FAKE_KEY} `)).toBe('')
  })
})

describe('isStepValid', () => {
  const form = { destination: '', days: 3, radius: 25, vibes: [], customVibes: [] }
  it('étape 1 : destination obligatoire', () => {
    expect(isStepValid(1, form)).toBe(false)
    expect(isStepValid(1, { ...form, destination: 'Kyoto' })).toBe(true)
  })
  it('étape 4 : au moins une vibe (même en cours de saisie)', () => {
    expect(isStepValid(4, form)).toBe(false)
    expect(isStepValid(4, form, 'Jazz')).toBe(true)
    expect(isStepValid(4, { ...form, vibes: ['Nature'] })).toBe(true)
  })
})

describe('format', () => {
  it('pluralize', () => {
    expect(pluralize(1, 'jour')).toBe('1 jour')
    expect(pluralize(2, 'jour')).toBe('2 jours')
  })
  it('formatRecap', () => {
    const form = { destination: 'Québec', days: 3, radius: 25, vibes: ['Gastronomie'], customVibes: ['Détente'] }
    expect(formatRecap(form)).toBe('Québec · 3 jours · 25 km · Gastronomie, Détente')
    expect(formatRecap({ ...form, destination: ' ', vibes: [], customVibes: [] })).toBe('… · 3 jours · 25 km')
  })
})
