import {
  closestCenter,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { SortableContext } from '@dnd-kit/sortable'
import { useRef, useState } from 'react'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion.js'
import DayCard from './DayCard.jsx'
import DayDragPreview from './DayDragPreview.jsx'
import styles from './DayList.module.css'

const keepInPlace = () => null

const KEY_STEPS = { ArrowDown: 1, ArrowUp: -1 }

function neighbourCoordinates(event, { context }) {
  const step = KEY_STEPS[event.code]
  if (!step) return undefined
  event.preventDefault()
  const { active, over, droppableRects, collisionRect } = context
  if (!active || !collisionRect) return undefined
  const ordered = [...droppableRects.entries()].sort(([, a], [, b]) => a.top - b.top)
  const index = ordered.findIndex(([id]) => id === (over?.id ?? active.id))
  const target = ordered[index + step]
  if (!target) return undefined
  const [, rect] = target
  return { x: collisionRect.left, y: rect.top + rect.height / 2 - collisionRect.height / 2 }
}

const SCREEN_READER_INSTRUCTIONS = {
  draggable:
    'Pour déplacer ce jour, appuie sur Espace ou Entrée, utilise les flèches haut et bas, puis appuie de nouveau sur Espace ou Entrée pour le déposer. Échap pour annuler.',
}

export default function DayList({ days, openDayId, popDayId, hoverStepId, onToggle, onMove, onDelete, onHover }) {
  const listRef = useRef(null)
  const reduced = usePrefersReducedMotion()
  const [activeId, setActiveId] = useState(null)
  const [overId, setOverId] = useState(null)
  const [announcement, setAnnouncement] = useState('')

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: neighbourCoordinates }),
  )

  const position = (id) => days.findIndex((d) => d.id === id) + 1
  const announcements = {
    onDragStart: ({ active }) => `Jour ${position(active.id)} saisi.`,
    onDragOver: ({ active, over }) =>
      over ? `Jour ${position(active.id)} au-dessus de la position ${position(over.id)}.` : `Jour ${position(active.id)} hors de la liste.`,
    onDragEnd: ({ active, over }) =>
      over ? `Jour ${position(active.id)} déposé en position ${position(over.id)}.` : `Jour ${position(active.id)} relâché.`,
    onDragCancel: ({ active }) => `Déplacement annulé. Le jour ${position(active.id)} reste à sa place.`,
  }

  const resetDrag = () => {
    setActiveId(null)
    setOverId(null)
  }

  const onDragEnd = ({ active, over }) => {
    resetDrag()
    if (!over || active.id === over.id) return
    onMove(position(active.id) - 1, position(over.id) - 1)
  }

  const moveWithButton = (index, delta) => {
    const day = days[index]
    const target = index + delta
    onMove(index, target)
    setAnnouncement(`Jour déplacé en position ${target + 1}.`)
    requestAnimationFrame(() => {
      const card = listRef.current?.querySelector(`[data-day="${day.id}"]`)
      const sameButton = card?.querySelector(`[data-move="${delta < 0 ? 'up' : 'down'}"]`)
      if (sameButton && !sameButton.disabled) sameButton.focus()
      else card?.querySelector('[data-toggle]')?.focus()
    })
  }

  const activeIndex = days.findIndex((d) => d.id === activeId)

  return (
    <div ref={listRef} className={styles.list}>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        accessibility={{ announcements, screenReaderInstructions: SCREEN_READER_INSTRUCTIONS }}
        onDragStart={({ active }) => setActiveId(active.id)}
        onDragOver={({ over }) => setOverId(over?.id ?? null)}
        onDragEnd={onDragEnd}
        onDragCancel={resetDrag}
      >
        <SortableContext items={days.map((d) => d.id)} strategy={keepInPlace}>
          {days.map((day, index) => (
            <DayCard
              key={day.id}
              day={day}
              index={index}
              total={days.length}
              open={day.id === openDayId}
              pop={day.id === popDayId}
              dropTarget={activeId !== null && overId === day.id && activeId !== day.id}
              hoverStepId={hoverStepId}
              onToggle={() => onToggle(day.id)}
              onMoveUp={() => moveWithButton(index, -1)}
              onMoveDown={() => moveWithButton(index, 1)}
              onDelete={() => onDelete(day.id)}
              onHover={onHover}
            />
          ))}
        </SortableContext>
        <DragOverlay dropAnimation={reduced ? null : undefined}>
          {activeIndex >= 0 && <DayDragPreview day={days[activeIndex]} number={activeIndex + 1} />}
        </DragOverlay>
      </DndContext>
      <p className="visually-hidden" aria-live="polite">
        {announcement}
      </p>
    </div>
  )
}
