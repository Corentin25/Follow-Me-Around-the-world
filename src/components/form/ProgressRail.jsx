import { cx } from '../../lib/cx.js'
import Icon from '../ui/Icon.jsx'
import styles from './ProgressRail.module.css'

const LABELS = ['Destination', 'Durée', 'Rayon', 'Vibe']

export default function ProgressRail({ step, className }) {
  const last = LABELS.length - 1
  const pct = ((step - 1) / last) * 100

  return (
    <div className={cx(styles.wrap, className)}>
      <div className={styles.rail} role="img" aria-label={`Étape ${step} sur ${LABELS.length} : ${LABELS[step - 1]}`}>
        <div className={styles.line}>
          <div className={styles.fill} style={{ width: `${pct}%` }} />
        </div>
        {LABELS.map((label, i) => (
          <span
            key={label}
            className={cx(styles.dot, i + 1 < step && styles.done, i + 1 === step && styles.now)}
            style={{ left: `${(i / last) * 100}%` }}
          />
        ))}
        <div className={styles.plane} style={{ left: `${pct}%` }}>
          <Icon name="plane" className={styles.planeIcon} />
        </div>
      </div>
      <div className={styles.labels} aria-hidden="true">
        {LABELS.map((label, i) => (
          <b key={label} className={cx(styles.label, i + 1 === step && styles.labelNow)}>
            {label}
          </b>
        ))}
      </div>
    </div>
  )
}
