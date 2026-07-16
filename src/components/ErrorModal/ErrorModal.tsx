import { useEffect } from 'react'
import './ErrorModal.css'

interface ErrorModalProps {
  /** 타이틀. (Figma: "카드를 만들지 못했어요") */
  title?: string
  /** 보조 안내 문구. (Figma: "다시 시도해 주세요") */
  description?: string
  /** 액션 버튼 라벨. (Figma: "뒤로가기") */
  actionLabel?: string
  /** 액션 버튼 클릭 — 모달을 닫아 사용자가 다시 시도할 수 있게 한다. */
  onAction: () => void
  /** 백드롭 클릭·ESC로 닫기. 지정 시에만 허용한다(안내용 알림이라 닫기 허용). */
  onClose?: () => void
}

/**
 * 카드 생성 실패 모달 (Figma: iPhone 17 - 25).
 * 배경 선택(#3)에서 "카드 만들기" 저장이 실패(API 호출 실패·네트워크 등)했을 때 화면 위에 덮이는
 * 딤 오버레이 + 중앙 카드(경고 아이콘 + 안내 문구 + "뒤로가기"). 로딩 모달(iPhone 17-20)의 실패 짝이라
 * 같은 240px 카드 규격을 공유한다. UI 전용 — 재시도/닫기는 onAction/onClose로 상위에 위임한다.
 */
function ErrorModal({
  title = '카드를 만들지 못했어요',
  description = '다시 시도해 주세요',
  actionLabel = '뒤로가기',
  onAction,
  onClose,
}: ErrorModalProps) {
  useEffect(() => {
    if (!onClose) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div className="error-modal" onClick={onClose}>
      <div
        className="error-modal__card"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="error-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="error-modal__body">
          {/* 경고 아이콘 (Figma: alert-circle 24px, stroke #AE97E7) */}
          <span className="error-modal__icon" aria-hidden="true">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="9" stroke="#AE97E7" strokeWidth="2" />
              <path d="M12 8v4.5" stroke="#AE97E7" strokeWidth="2" strokeLinecap="round" />
              <circle cx="12" cy="16" r="1" fill="#AE97E7" />
            </svg>
          </span>
          <div className="error-modal__text">
            <p className="error-modal__title" id="error-modal-title">
              {title}
            </p>
            <p className="error-modal__desc">{description}</p>
          </div>
        </div>
        <button type="button" className="error-modal__button" onClick={onAction}>
          {actionLabel}
        </button>
      </div>
    </div>
  )
}

export default ErrorModal
