import { useEffect, useRef } from 'react'
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
  // onDismiss는 호출부에서 매 렌더 새 함수로 올 수 있어(부모 리렌더 시) 의존성에 두면
  // 타이머가 계속 리셋된다. ref에 최신 콜백만 담아 두고 타이머는 duration에만 반응시킨다.
  const onDismissRef = useRef(onDismiss)
  onDismissRef.current = onDismiss

  useEffect(() => {
    const t = setTimeout(() => onDismissRef.current(), duration)
    return () => clearTimeout(t)
  }, [duration])

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
