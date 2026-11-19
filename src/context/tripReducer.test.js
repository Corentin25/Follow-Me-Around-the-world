import { describe, expect, it } from 'vitest'
import sample from '../data/sample-itinerary.json'
import { withIds } from '../lib/itinerary.js'
import { createInitialState, tripReducer } from './tripReducer.js'

const withTrip = () =>
  tripReducer(
    tripReducer(createInitialState({ apiKey: 'k' }), { type: 'SET_FORM', patch: { destination: 'Québec' } }),
    { type: 'SET_ITINERARY', itinerary: withIds(sample) },
  )

describe('tripReducer', () => {
  it('supprime un jour puis annule', () => {
    const deleted = tripReducer(withTrip(), { type: 'DELETE_DAY', id: 'd1' })
    expect(deleted.itinerary.jours.map((d) => d.jour)).toEqual([1, 2])
    expect(deleted.lastDeleted.index).toBe(0)
    const undone = tripReducer(deleted, { type: 'UNDO_DELETE' })
    expect(undone.itinerary.jours.map((d) => d.id)).toEqual(['d1', 'd2', 'd3'])
    expect(undone.lastDeleted).toBeNull()
  })

  it('réordonne les jours', () => {
    const next = tripReducer(withTrip(), { type: 'REORDER_DAYS', from: 0, to: 1 })
    expect(next.itinerary.jours.map((d) => d.id)).toEqual(['d2', 'd1', 'd3'])
  })

  it('« Nouvel itinéraire » efface le voyage mais garde la clé', () => {
    const reset = tripReducer(withTrip(), { type: 'RESET_TRIP' })
    expect(reset.apiKey).toBe('k')
    expect(reset.itinerary).toBeNull()
    expect(reset.form.destination).toBe('')
  })

  it('refuse une action inconnue', () => {
    expect(() => tripReducer(createInitialState(), { type: 'NOPE' })).toThrow()
  })
})
