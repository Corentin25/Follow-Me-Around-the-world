import { useEffect, useRef } from 'react'

export function usePageSetup(title) {
  const headingRef = useRef(null)
  useEffect(() => {
    document.title = title ? `${title} — Follow Me` : 'Follow Me — Around the world'
    headingRef.current?.focus({ preventScroll: true })
  }, [title])
  return headingRef
}
