import { useSortable } from '@dnd-kit/sortable'
import { pluralize } from '../../lib/format.js'
import { cx } from '../../lib/cx.js'
import Icon from '../ui/Icon.jsx'
import IconButton from '../ui/IconButton.jsx'
import styles from './DayCard.module.css'
import DayTimeline from './DayTimeline.jsx'

export default function DayCard({
  day,
  index,
  total,
  open,
  pop,
  dropTarget,
  hoverStepId,
  onToggle,
  onMoveUp,
  onMoveDown,
  onDelete,
  onHover,
}) {
  const { attributes, listeners, setNodeRef, setActivatorNodeRef, isDragging } = useSortable({ id: day.id })
  const collapseId = `jour-${day.id}`
  const number = index + 1

  return (
    <article
      ref={setNodeRef}
      data-day={day.id}
      className={cx(
        styles.card,
        open && styles.open,
        isDragging && styles.dragging,
        dropTarget && styles.over,
        pop && styles.pop,
      )}
      style={{ animationDelay: `${(0.15 + index * 0.08).toFixed(2)}s` }}
    >
      <div className={styles.head}>
        <button
          ref={setActivatorNodeRef}
          type="button"
          className={styles.grip}
          {...attributes}
          {...listeners}
          aria-label={`Déplacer le jour ${number} par glisser-déposer`}
        >
          <Icon name="grip" filled />
        </button>
        <button
          type="button"
          data-toggle
          className={styles.toggle}
          aria-expanded={open}
          aria-controls={collapseId}
          aria-label={`Jour ${number} : ${day.titre}, ${pluralize(day.etapes.length, 'étape')}`}
          onClick={onToggle}
        >
          <span className={styles.dayNum}>JOUR {number}</span>
          <span className={styles.dayTitle}>{day.titre}</span>
          <span className={styles.dayMeta}>{pluralize(day.etapes.length, 'étape')}</span>
          <Icon name="chevronDown" className={cx(styles.chevron, open && styles.chevronOpen)} />
        </button>
        <IconButton
          icon="chevronsUp"
          label={`Monter le jour ${number} d'un rang`}
          title="Monter ce jour"
          data-move="up"
          className={styles.mv}
          iconClassName={styles.mvIcon}
          disabled={index === 0}
          onClick={onMoveUp}
        />
        <IconButton
          icon="chevronsDown"
          label={`Descendre le jour ${number} d'un rang`}
          title="Descendre ce jour"
          data-move="down"
          className={styles.mv}
          iconClassName={styles.mvIcon}
          disabled={index === total - 1}
          onClick={onMoveDown}
        />
        <IconButton
          icon="trash"
          label={`Supprimer le jour ${number}`}
          danger
          className={styles.trash}
          onClick={onDelete}
        />
      </div>
      <div id={collapseId} className={cx(styles.collapse, open && styles.collapseOpen)}>
        <div className={styles.collapseIn} inert={!open}>
          <DayTimeline steps={day.etapes} hoverStepId={hoverStepId} onHover={onHover} />
        </div>
      </div>
    </article>
  )
}
