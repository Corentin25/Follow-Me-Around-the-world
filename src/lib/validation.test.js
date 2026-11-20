import { describe, expect, it } from 'vitest'
import { formatRecap, pluralize } from './format.js'
import { getApiKeyError, isStepValid } from './validation.js'

const FAKE_AIZA_KEY = 'AI' + 'za' + 'Sy' + 'x'.repeat(33)
const FAKE_AQ_KEY = 'AQ' + '.Ab' + 'x8_-'.repeat(12) + '.yZ'

describe('getApiKeyError', () => {
  it('refuse une clé vide', () => {
    expect(getApiKeyError('   ')).toBe('Colle ta clé Google AI Studio pour continuer.')
  })
  it('accepte une clé au format AIza…', () => {
    expect(FAKE_AIZA_KEY).toHaveLength(39)
    expect(getApiKeyError(FAKE_AIZA_KEY)).toBe('')
  })
  it('accepte une clé au format AQ.Ab…', () => {
    expect(getApiKeyError(FAKE_AQ_KEY)).toBe('')
  })
  it('tolère les espaces autour de la clé', () => {
    expect(getApiKeyError(`  ${FAKE_AQ_KEY}\n`)).toBe('')
  })
  it('ne vérifie plus le préfixe ni la longueur exacte de 39', () => {
    expect(getApiKeyError(FAKE_AIZA_KEY + 'abc')).toBe('')
    expect(getApiKeyError('x'.repeat(20))).toBe('')
  })
  it('refuse une clé trop courte ou trop longue', () => {
    expect(getApiKeyError('x'.repeat(19))).toMatch(/ne ressemble pas/)
    expect(getApiKeyError('x'.repeat(200))).toBe('')
    expect(getApiKeyError('x'.repeat(201))).toMatch(/ne ressemble pas/)
  })
  it('refuse une espace ou un caractère interdit au milieu', () => {
    expect(getApiKeyError('AQ.Ab' + 'x'.repeat(10) + ' ' + 'x'.repeat(10))).toMatch(/ne ressemble pas/)
    expect(getApiKeyError('x'.repeat(25) + '/')).toMatch(/ne ressemble pas/)
    expect(getApiKeyError('x'.repeat(25) + '<')).toMatch(/ne ressemble pas/)
    expect(getApiKeyError('clé-avec-accent-é-xxxxxxxx')).toMatch(/ne ressemble pas/)
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
