import { cx } from '../../lib/cx.js'
import Icon from './Icon.jsx'
import styles from './TextField.module.css'

export default function TextField({ icon, iconTone = 'muted', invalid = false, trailing, className, ref, ...inputProps }) {
  return (
    <div className={cx(styles.field, invalid && styles.bad, className)}>
      {icon && <Icon name={icon} className={styles[iconTone]} />}
      <input ref={ref} className={styles.input} aria-invalid={invalid || undefined} {...inputProps} />
      {trailing}
    </div>
  )
}
