import layout from '../../data/logo-layout.json'
import { cx } from '../../lib/cx.js'
import styles from './Logo.module.css'

const LOGO_DIR = `${import.meta.env.BASE_URL}assets/logo/`

export default function Logo({ size, className }) {
  return (
    <div
      className={cx(styles.logo, className)}
      role="img"
      aria-label="Follow Me – Around the world !"
      style={{ fontSize: `${size}px` }}
    >
      {layout.images.map((img) => (
        <img
          key={img.file}
          alt=""
          draggable={false}
          src={`${LOGO_DIR}${img.file}`}
          className={img.animated ? styles.letter : undefined}
          style={{
            left: `${img.left}em`,
            top: `${img.top}em`,
            width: `${img.width}em`,
            ...(img.animated && {
              '--dx': `${img.dx}em`,
              '--dy': `${img.dy}em`,
              '--r': `${img.rotateDeg}deg`,
              animationDelay: `${img.delayS}s`,
            }),
          }}
        />
      ))}
    </div>
  )
}
