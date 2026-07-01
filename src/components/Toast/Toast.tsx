import { useEffect } from 'react'
import './Toast.css'

interface ToastProps {
  message: string
  /** 자동 사라짐까지 시간(ms). 기본 2500. */
  duration?: number
  onDismiss: () => void
}

/**
 * 상단 알림 토스트 (Figma Toast 5:1333 근사).
 * 마운트 후 duration 뒤 자동으로 onDismiss 를 호출한다.
 */
function Toast({ message, duration = 2500, onDismiss }: ToastProps) {
  useEffect(() => {
    const t = setTimeout(onDismiss, duration)
    return () => clearTimeout(t)
  }, [duration, onDismiss])

  return (
    <div className="toast" role="status">
      {message}
    </div>
  )
}

export default Toast
