import { cx } from '../../lib/cx.js'
import styles from './Button.module.css'

export default function Button({
  variant = 'outline',
  size = 'md',
  type = 'button',
  className,
  ref,
  children,
  ...rest
}) {
  const classes =
    variant === 'link'
      ? cx(styles.link, className)
      : cx(
          styles.btn,
          (variant === 'primary' || variant === 'hero') && styles.primary,
          variant === 'hero' && styles.hero,
          styles[size],
          className,
        )
  return (
    <button ref={ref} type={type} className={classes} {...rest}>
      {children}
    </button>
  )
}
