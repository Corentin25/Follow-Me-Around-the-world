import { describe, expect, it } from 'vitest'
import sample from '../data/sample-itinerary.json'
import { moveDay, moveItem, removeDay, renumberDays, restoreDay, withIds } from './itinerary.js'

const days = () => withIds(sample).jours

describe('withIds', () => {
  it('donne des id uniques aux jours et aux étapes', () => {
    const it = withIds(sample)
    expect(it.jours.map((d) => d.id)).toEqual(['d1', 'd2', 'd3'])
    const stepIds = it.jours.flatMap((d) => d.etapes.map((s) => s.id))
    expect(new Set(stepIds).size).toBe(stepIds.length)
  })
})

describe('moveItem', () => {
  it('déplace un élément sans modifier le tableau d’origine', () => {
    const list = ['a', 'b', 'c']
    expect(moveItem(list, 0, 2)).toEqual(['b', 'c', 'a'])
    expect(list).toEqual(['a', 'b', 'c'])
  })
  it('ignore les index hors limites', () => {
    const list = ['a', 'b']
    expect(moveItem(list, 0, 5)).toBe(list)
    expect(moveItem(list, -1, 0)).toBe(list)
  })
})

describe('moveDay / renumberDays', () => {
  it('renumérote après un déplacement', () => {
    const moved = moveDay(days(), 2, 0)
    expect(moved.map((d) => d.id)).toEqual(['d3', 'd1', 'd2'])
    expect(moved.map((d) => d.jour)).toEqual([1, 2, 3])
  })
  it('garde le même objet quand le numéro est déjà bon', () => {
    const list = days()
    expect(renumberDays(list)[0]).toBe(list[0])
  })
})

describe('removeDay / restoreDay', () => {
  it('supprime puis rétablit un jour à sa place', () => {
    const { days: left, removed } = removeDay(days(), 'd2')
    expect(left.map((d) => d.id)).toEqual(['d1', 'd3'])
    expect(left.map((d) => d.jour)).toEqual([1, 2])
    const back = restoreDay(left, removed)
    expect(back.map((d) => d.id)).toEqual(['d1', 'd2', 'd3'])
    expect(back.map((d) => d.jour)).toEqual([1, 2, 3])
  })
  it('ne fait rien pour un id inconnu', () => {
    const list = days()
    expect(removeDay(list, 'zzz')).toEqual({ days: list, removed: null })
  })
})
