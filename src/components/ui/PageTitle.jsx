import { Fragment } from 'react'
import { cx } from '../../lib/cx.js'
import styles from './PageTitle.module.css'

const FIRST_DELAY = 0.2
const MAX_STEP = 0.05
const MAX_SPREAD = 0.95

function splitTitle(text) {
  const step = Math.min(MAX_STEP, MAX_SPREAD / Math.max(text.length - 1, 1))
  const words = []
  let index = 0
  for (const word of text.split(' ')) {
    const letters = [...word].map((ch, i) => ({
      ch,
      delay: `${(FIRST_DELAY + (index + i) * step).toFixed(2)}s`,
    }))
    words.push(letters)
    index += letters.length + 1
  }
  return words
}

export default function PageTitle({ ref, text, className, ...rest }) {
  return (
    <h1 ref={ref} tabIndex={-1} aria-label={text} className={cx(styles.title, className)} {...rest}>
      {splitTitle(text).map((letters, w) => (
        <Fragment key={w}>
          {w > 0 && ' '}
          <span className={styles.word} aria-hidden="true">
            {letters.map(({ ch, delay }, i) => (
              <span key={i} className={styles.letter} style={{ animationDelay: delay }}>
                {ch}
              </span>
            ))}
          </span>
        </Fragment>
      ))}
    </h1>
  )
}
