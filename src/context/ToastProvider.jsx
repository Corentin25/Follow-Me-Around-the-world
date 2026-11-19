import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Toast from '../components/layout/Toast.jsx'
import { ToastContext } from './ToastContext.js'

export default function ToastProvider({ children }) {
  const [toast, setToast] = useState(null)
  const timer = useRef(null)
  const counter = useRef(0)

  const hideToast = useCallback(() => {
    clearTimeout(timer.current)
    setToast(null)
  }, [])

  const showToast = useCallback((message, { onUndo, duration } = {}) => {
    clearTimeout(timer.current)
    counter.current += 1
    setToast({ id: counter.current, message, onUndo })
    timer.current = setTimeout(() => setToast(null), duration ?? (onUndo ? 6000 : 3500))
  }, [])

  useEffect(() => () => clearTimeout(timer.current), [])

  const value = useMemo(() => ({ showToast, hideToast }), [showToast, hideToast])

  return (
    <ToastContext.Provider value={value}>
      {children}
      <Toast toast={toast} onDismiss={hideToast} />
    </ToastContext.Provider>
  )
}
