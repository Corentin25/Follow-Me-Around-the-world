import { cx } from '../../lib/cx.js'
import styles from './TitleDivider.module.css'

export default function TitleDivider({ className }) {
  return <div className={cx(styles.divider, className)} aria-hidden="true" />
}
