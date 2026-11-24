import sample from '../data/sample-itinerary.json'
import { abortError } from '../lib/async.js'
import { withIds } from '../lib/itinerary.js'

export async function fetchItinerary(request, { signal } = {}) {
  if (signal?.aborted) throw abortError()
  return withIds(sample)
}
