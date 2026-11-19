import { cx } from '../../lib/cx.js'
import styles from './Chip.module.css'

export default function Chip({ on = false, static: isStatic = false, pop = false, className, children, ...rest }) {
  const classes = cx(styles.chip, on && styles.on, isStatic && styles.static, pop && styles.pop, className)
  if (isStatic) {
    return (
      <span className={classes} {...rest}>
        {children}
      </span>
    )
  }
  return (
    <button type="button" className={classes} {...rest}>
      {children}
    </button>
  )
}
