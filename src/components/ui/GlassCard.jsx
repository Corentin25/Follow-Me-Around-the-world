import { cx } from '../../lib/cx.js'
import styles from './GlassCard.module.css'

export default function GlassCard({ as: Tag = 'div', className, ...rest }) {
  return <Tag className={cx(styles.glass, className)} {...rest} />
}
