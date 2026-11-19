import { cx } from '../../lib/cx.js'
import styles from './Icon.module.css'
import { ICONS } from './iconPaths.jsx'

export default function Icon({ name, filled = false, className }) {
  return (
    <svg
      className={cx(styles.ic, filled && styles.filled, className)}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      {ICONS[name]}
    </svg>
  )
}
