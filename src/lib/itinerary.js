export function withIds(itinerary) {
  let stepCount = 0
  return {
    ville: itinerary.ville,
    jours: itinerary.jours.map((day, i) => ({
      id: `d${i + 1}`,
      jour: i + 1,
      titre: day.titre,
      etapes: day.etapes.map((step) => {
        stepCount += 1
        return { ...step, id: `s${stepCount}` }
      }),
    })),
  }
}

export function renumberDays(days) {
  return days.map((day, i) => (day.jour === i + 1 ? day : { ...day, jour: i + 1 }))
}

export function moveItem(list, from, to) {
  if (from === to || from < 0 || to < 0 || from >= list.length || to >= list.length) return list
  const next = list.slice()
  const [moved] = next.splice(from, 1)
  next.splice(to, 0, moved)
  return next
}

export function moveDay(days, from, to) {
  return renumberDays(moveItem(days, from, to))
}

export function removeDay(days, id) {
  const index = days.findIndex((d) => d.id === id)
  if (index < 0) return { days, removed: null }
  return {
    days: renumberDays(days.filter((d) => d.id !== id)),
    removed: { day: days[index], index },
  }
}

export function restoreDay(days, removed) {
  if (!removed) return days
  const next = days.slice()
  next.splice(Math.min(removed.index, next.length), 0, removed.day)
  return renumberDays(next)
}
