import { pluralize } from '../../lib/format.js'
import Icon from '../ui/Icon.jsx'
import styles from './DayDragPreview.module.css'

export default function DayDragPreview({ day, number }) {
  return (
    <div className={styles.preview}>
      <span className={styles.grip}>
        <Icon name="grip" filled />
      </span>
      <span className={styles.dayNum}>JOUR {number}</span>
      <span className={styles.dayTitle}>{day.titre}</span>
      <span className={styles.dayMeta}>{pluralize(day.etapes.length, 'étape')}</span>
    </div>
  )
}
