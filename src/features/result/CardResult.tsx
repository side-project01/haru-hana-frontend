import { useState } from 'react'
import CardPreview from '../../components/CardPreview/CardPreview'
import Button from '../../components/Button/Button'
import BackButton from '../../components/BackButton/BackButton'
import Toast from '../../components/Toast/Toast'
import './CardResult.css'

interface CardResultProps {
  /** 카드에 재노출할 오늘의 질문. */
  question?: string
  /** 카드에 표시할 사용자의 답변. (줄바꿈 `\n` 반영) */
  answer?: string
  /** 카드 상단 날짜 라벨 (Figma: 2026-12-05). */
  date?: string
  /** 3번에서 선택한 카드 배경(CSS 값). 미지정 시 Figma 샘플 보라 그라데이션. */
  background?: string
  /** 헤더 "뒤로가기" */
  onBack?: () => void
  /**
   * "카드 다운하기" 클릭 시 호출(선택). 실제 저장은 카드 영역을 이미지로 캡쳐하는
   * 방식으로 추후 구현한다. (지금은 완료 토스트만 노출)
   */
  onDownload?: () => void
  /** "다른 사람이 남긴 답변 보기" — 타인 답변(5번)으로 이동. */
  onViewOthers?: () => void
}

// Figma iPhone 17-9가 보여주는 샘플 배경(보라 그라데이션).
// 실제 흐름에서는 3번(배경 선택)에서 고른 값이 주입되어 이 기본값을 덮는다.
const SAMPLE_BG = 'linear-gradient(155deg, #E9E1F4 0%, #9A6AC6 100%)'

/** 다운로드 완료 토스트의 체크 아이콘 (Figma check-contained 20×20 — 흰 원 + 진한 체크). */
function CheckCircleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="10" fill="currentColor" />
      <path
        d="M5.8 10.4 8.6 13.1 14.2 7.2"
        stroke="#303030"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/**
 * 화면 #4 내 카드 결과 (Figma: iPhone 17 - 9 / 다운로드 완료 토스트는 iPhone 17 - 10).
 * 헤더(뒤로가기) + 완성 카드 프리뷰 + [카드 다운하기 / 다른 사람이 남긴 답변 보기].
 * "카드 다운하기"는 카드 영역을 이미지로 캡쳐해 저장하는 방식(추후 구현)이며,
 * 지금은 완료 토스트만 노출한다.
 */
function CardResult({
  question = '무인도에 딱 한권의 책만 가져갈수 있다면 어떤 책인가요?',
  answer = '‘세이노의 가르침’.\n곱씹을수록 새로운 문장을 발견하게 되는 책.',
  date = '2026-12-05',
  background = SAMPLE_BG,
  onBack,
  onDownload,
  onViewOthers,
}: CardResultProps) {
  // 다운로드 시마다 증가 → Toast를 key로 remount 해 애니메이션/타이머를 재시작.
  const [toastId, setToastId] = useState(0)

  // TODO: 카드 영역을 이미지로 캡쳐해 저장 (html2canvas/html-to-image 등). 지금은 완료 토스트만.
  const handleDownload = () => {
    onDownload?.()
    setToastId((id) => id + 1)
  }

  return (
    <div className="screen result">
      {/* 헤더: < 뒤로가기 (Figma Frame 48/46) */}
      <BackButton onClick={onBack} />

      <div className="result__content">
        {/* 완성 카드 — 배경 선택 결과 반영 (#3/#4/#5 공용 프리뷰) */}
        <CardPreview question={question} answer={answer} date={date} background={background} />

        {/* 액션: 다운로드(primary) / 타인 답변(secondary) — Figma Frame 3 */}
        <div className="result__actions">
          <Button onClick={handleDownload}>카드 다운하기</Button>
          <Button variant="secondary" onClick={onViewOthers}>
            다른 사람이 남긴 답변 보기
          </Button>
        </div>
      </div>

      {/* 다운로드 완료 토스트 (Figma iPhone 17-10) — 하단, 체크 아이콘 */}
      {toastId > 0 && (
        <Toast
          key={toastId}
          position="bottom"
          icon={<CheckCircleIcon />}
          message="카드가 성공적으로 다운로드 되었어요."
          onDismiss={() => setToastId(0)}
        />
      )}
    </div>
  )
}

export default CardResult
