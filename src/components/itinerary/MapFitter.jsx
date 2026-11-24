import L from 'leaflet'
import { useEffect } from 'react'
import { useMap } from 'react-leaflet'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion.js'

export default function MapFitter({ days, openDayId }) {
  const map = useMap()
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const observer = new ResizeObserver(() => map.invalidateSize())
    observer.observe(map.getContainer())
    return () => observer.disconnect()
  }, [map])

  useEffect(() => {
    const openDay = days.find((d) => d.id === openDayId)
    const steps = openDay ? openDay.etapes : days.flatMap((d) => d.etapes)
    if (steps.length === 0) return
    const bounds = L.latLngBounds(steps.map((s) => [s.latitude, s.longitude]))
    map.fitBounds(bounds, { padding: [56, 56], maxZoom: 16, animate: !reduced })
  }, [map, days, openDayId, reduced])

  return null
}
