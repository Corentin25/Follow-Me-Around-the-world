import { allVibes } from './vibes.js'

export function pluralize(count, word) {
  return `${count} ${word}${count > 1 ? 's' : ''}`
}

export function formatRecap(form, pendingVibe = '') {
  const vibes = allVibes(form, pendingVibe).join(', ')
  const parts = [form.destination.trim() || '…', pluralize(form.days, 'jour'), `${form.radius} km`]
  if (vibes) parts.push(vibes)
  return parts.join(' · ')
}
