import { describe, expect, it } from 'vitest'
import { MAX_CUSTOM_VIBES } from './tripOptions.js'
import { addVibe, allVibes, toggleVibe } from './vibes.js'

const empty = { vibes: [], customVibes: [] }

describe('addVibe', () => {
  it('ajoute un mot perso (espaces nettoyés)', () => {
    expect(addVibe(empty, '  Plage   et  soleil ')).toEqual({ vibes: [], customVibes: ['Plage et soleil'] })
  })
  it('coche la suggestion si le mot correspond (insensible à la casse)', () => {
    expect(addVibe(empty, 'nature')).toEqual({ vibes: ['Nature'], customVibes: [] })
  })
  it('ignore les doublons et le texte vide', () => {
    const once = addVibe(empty, 'Surf')
    expect(addVibe(once, 'SURF')).toEqual(once)
    expect(addVibe(once, '   ')).toEqual(once)
  })
  it('s’arrête au maximum de mots perso', () => {
    let state = empty
    for (let i = 0; i < MAX_CUSTOM_VIBES + 3; i++) state = addVibe(state, `mot${i}`)
    expect(state.customVibes).toHaveLength(MAX_CUSTOM_VIBES)
  })
})

describe('toggleVibe / allVibes', () => {
  it('coche puis décoche', () => {
    expect(toggleVibe([], 'Nature')).toEqual(['Nature'])
    expect(toggleVibe(['Nature'], 'Nature')).toEqual([])
  })
  it('inclut le texte en cours de saisie', () => {
    expect(allVibes({ vibes: ['Nature'], customVibes: ['Surf'] }, ' Jazz ')).toEqual(['Nature', 'Surf', 'Jazz'])
  })
})
