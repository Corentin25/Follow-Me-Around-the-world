import { useId } from 'react'
import { cx } from '../../lib/cx.js'
import Icon from './Icon.jsx'
import styles from './RememberSwitch.module.css'

export default function RememberSwitch({ checked, onChange, label, note, className }) {
  const noteId = useId()
  return (
    <div className={cx(styles.block, className)}>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-describedby={note ? noteId : undefined}
        className={cx(styles.remember, checked && styles.on)}
        onClick={() => onChange(!checked)}
      >
        <span className={styles.track} aria-hidden="true">
          <span className={styles.thumb}>
            <Icon name="check" className={styles.check} />
          </span>
        </span>
        <span>{label}</span>
      </button>
      {note && (
        <p id={noteId} className={cx('hint', styles.note)}>
          {note}
        </p>
      )}
    </div>
  )
}
