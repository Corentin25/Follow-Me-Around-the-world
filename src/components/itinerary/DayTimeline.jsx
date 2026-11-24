import { cx } from '../../lib/cx.js'
import styles from './DayTimeline.module.css'

export default function DayTimeline({ steps, hoverStepId, onHover }) {
  return (
    <ol className={styles.timeline}>
      {steps.map((step, k) => (
        <li
          key={step.id}
          tabIndex={0}
          className={cx(styles.step, hoverStepId === step.id && styles.hot)}
          onMouseEnter={() => onHover(step.id)}
          onMouseLeave={() => onHover(null)}
          onFocus={() => onHover(step.id)}
          onBlur={() => onHover(null)}
        >
          <span className={styles.dot} aria-hidden="true">
            {k + 1}
          </span>
          <div>
            <time className={styles.time} dateTime={step.heure}>
              {step.heure}
            </time>
            <h2 className={styles.place}>{step.lieu}</h2>
            <p className={styles.desc}>{step.description}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}
