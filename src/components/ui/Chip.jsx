import { cx } from '../../lib/cx.js'
import Icon from './Icon.jsx'
import styles from './Chip.module.css'

export default function Chip({
  on = false,
  static: isStatic = false,
  pop = false,
  small = false,
  onRemove,
  removeLabel,
  className,
  children,
  ...rest
}) {
  const classes = cx(
    styles.chip,
    on && styles.on,
    isStatic && styles.static,
    pop && styles.pop,
    onRemove && styles.removable,
    small && styles.small,
    className,
  )
  if (onRemove) {
    return (
      <span className={classes} {...rest}>
        {children}
        <button type="button" className={styles.remove} aria-label={removeLabel} onClick={onRemove}>
          <Icon name="close" className={styles.removeIcon} />
        </button>
      </span>
    )
  }
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
