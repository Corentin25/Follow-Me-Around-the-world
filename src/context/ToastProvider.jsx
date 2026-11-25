import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Toast from '../components/layout/Toast.jsx'
import { ToastContext } from './ToastContext.js'

export default function ToastProvider({ children }) {
  const [toast, setToast] = useState(null)
  const timer = useRef(null)
  const counter = useRef(0)

  const startTimer = useCallback((ms) => {
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setToast(null), ms)
  }, [])

  const hideToast = useCallback(() => {
    clearTimeout(timer.current)
    setToast(null)
  }, [])

  const showToast = useCallback(
    (message, { onUndo, duration } = {}) => {
      counter.current += 1
      const ms = duration ?? (onUndo ? 6000 : 3500)
      setToast({ id: counter.current, message, onUndo, duration: ms })
      startTimer(ms)
    },
    [startTimer],
  )

  const pause = useCallback(() => clearTimeout(timer.current), [])
  const resume = useCallback(() => {
    if (toast) startTimer(toast.duration)
  }, [toast, startTimer])

  const undo = useCallback(() => {
    if (!toast?.onUndo) return
    const restore = toast.onUndo
    hideToast()
    restore()
  }, [toast, hideToast])

  useEffect(() => {
    if (!toast?.onUndo) return undefined
    const onKeyDown = (e) => {
      const typing = e.target instanceof Element && e.target.closest('input, textarea, [contenteditable="true"]')
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z' && !typing) {
        e.preventDefault()
        undo()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [toast, undo])

  useEffect(() => () => clearTimeout(timer.current), [])

  const value = useMemo(() => ({ showToast, hideToast }), [showToast, hideToast])

  return (
    <ToastContext.Provider value={value}>
      {children}
      <Toast toast={toast} onUndo={undo} onPause={pause} onResume={resume} />
    </ToastContext.Provider>
  )
}
