import { useEffect } from 'react'
import type { ReactNode } from 'react'
import './Toast.css'

interface ToastProps {
  message: string
  /** 자동 사라짐까지 시간(ms). 기본 2500. */
  duration?: number
  onDismiss: () => void
  /** 노출 위치. 새 질문 알림은 top(기본), 다운로드 완료는 bottom. */
  position?: 'top' | 'bottom'
  /** 메시지 앞 아이콘 (예: 체크). 지정 시 아이콘 + 텍스트 가로 배치. */
  icon?: ReactNode
}

/**
 * 알림 토스트 (Figma: 반투명 검정 pill, radius 12, padding 16/10).
 * 마운트 후 duration 뒤 자동으로 onDismiss 를 호출한다.
 */
function Toast({ message, duration = 2500, onDismiss, position = 'top', icon }: ToastProps) {
  useEffect(() => {
    const t = setTimeout(onDismiss, duration)
    return () => clearTimeout(t)
  }, [duration, onDismiss])

  return (
    <div className={`toast toast--${position}`} role="status">
      {icon && (
        <span className="toast__icon" aria-hidden="true">
          {icon}
        </span>
      )}
      <span className="toast__message">{message}</span>
    </div>
  )
}

export default Toast
