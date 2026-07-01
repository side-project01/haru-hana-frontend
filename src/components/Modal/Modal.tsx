import { useEffect } from 'react'
import Button from '../Button/Button'
import './Modal.css'

interface ModalProps {
  title: string
  description?: string
  /** 주 액션 버튼 라벨 */
  actionLabel: string
  onAction: () => void
  /** 백드롭 클릭·ESC로 닫기. 안내용 모달이라 닫기는 허용한다. */
  onClose?: () => void
}

/**
 * 중앙 모달 (백드롭 + 카드 + 공용 Button).
 * 완료 모달("오늘 이미 답변함") 등 안내 흐름에 사용한다.
 */
function Modal({ title, description, actionLabel, onAction, onClose }: ModalProps) {
  useEffect(() => {
    if (!onClose) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div className="modal" onClick={onClose}>
      <div
        className="modal__card"
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal__content">
          <h2 className="modal__title">{title}</h2>
          {description && <p className="modal__desc">{description}</p>}
        </div>
        <Button onClick={onAction}>{actionLabel}</Button>
      </div>
    </div>
  )
}

export default Modal
