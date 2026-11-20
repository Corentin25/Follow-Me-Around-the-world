import { useId } from 'react'
import { cx } from '../../lib/cx.js'
import styles from './StepPanel.module.css'

export default function StepPanel({ title, htmlFor, headingRef, dir, centered = false, className, children }) {
  const headingId = useId()
  const Heading = htmlFor ? 'label' : 'p'
  return (
    <div
      role="group"
      aria-labelledby={headingId}
      className={cx(styles.panel, dir < 0 ? styles.back : styles.forward, centered && styles.centered, className)}
    >
      <Heading ref={headingRef} id={headingId} htmlFor={htmlFor} tabIndex={-1} className={styles.heading}>
        {title}
      </Heading>
      {children}
    </div>
  )
}
