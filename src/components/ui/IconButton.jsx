import { cx } from '../../lib/cx.js'
import Icon from './Icon.jsx'
import styles from './IconButton.module.css'

export default function IconButton({ icon, label, danger = false, className, iconClassName, ref, ...rest }) {
  return (
    <button
      ref={ref}
      type="button"
      aria-label={label}
      className={cx(styles.iconBtn, danger && styles.danger, className)}
      {...rest}
    >
      <Icon name={icon} className={iconClassName} />
    </button>
  )
}
