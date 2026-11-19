import { moveDay, removeDay, restoreDay } from '../lib/itinerary.js'

export const initialForm = {
  destination: '',
  days: 3,
  radius: 25,
  vibes: [],
  customVibes: [],
}

export function createInitialState({ apiKey = '', remember = false } = {}) {
  return {
    apiKey,
    remember,
    demo: false,
    form: initialForm,
    itinerary: null,
    lastDeleted: null,
    status: 'idle',
    error: null,
  }
}

function updateDays(state, days) {
  return { ...state, itinerary: { ...state.itinerary, jours: days } }
}

export function tripReducer(state, action) {
  switch (action.type) {
    case 'SET_API_KEY':
      return { ...state, apiKey: action.apiKey, demo: false }
    case 'CLEAR_API_KEY':
      return { ...state, apiKey: '', remember: false }
    case 'SET_REMEMBER':
      return { ...state, remember: action.remember }
    case 'START_DEMO':
      return { ...state, demo: true }

    case 'SET_FORM':
      return { ...state, form: { ...state.form, ...action.patch } }

    case 'REQUEST_START':
      return { ...state, status: 'loading', error: null }
    case 'REQUEST_ERROR':
      return { ...state, status: 'error', error: action.message }
    case 'REQUEST_CANCEL':
      return { ...state, status: 'idle', error: null }
    case 'SET_ITINERARY':
      return { ...state, itinerary: action.itinerary, lastDeleted: null, status: 'done', error: null }

    case 'REORDER_DAYS':
      if (!state.itinerary) return state
      return updateDays(state, moveDay(state.itinerary.jours, action.from, action.to))
    case 'DELETE_DAY': {
      if (!state.itinerary) return state
      const { days, removed } = removeDay(state.itinerary.jours, action.id)
      if (!removed) return state
      return { ...updateDays(state, days), lastDeleted: removed }
    }
    case 'UNDO_DELETE':
      if (!state.itinerary || !state.lastDeleted) return state
      return { ...updateDays(state, restoreDay(state.itinerary.jours, state.lastDeleted)), lastDeleted: null }

    case 'RESET_TRIP':
      return {
        ...createInitialState({ apiKey: state.apiKey, remember: state.remember }),
        demo: state.demo,
      }

    default:
      throw new Error(`Action inconnue : ${action.type}`)
  }
}
