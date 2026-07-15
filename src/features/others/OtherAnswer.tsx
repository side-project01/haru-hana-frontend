import { useState } from 'react'
import CardPreview from '../../components/CardPreview/CardPreview'
import Button from '../../components/Button/Button'
import Toast from '../../components/Toast/Toast'
import './OtherAnswer.css'

interface OtherAnswerProps {
  /** 같은 질문(카드에 재노출). */
  question: string
  /** 카드 상단 날짜 라벨 (서버 기준 KST). */
  date: string
  /** 타인의 답변 텍스트 (앞 카드, 크게 표시). 줄바꿈 `\n` 반영. */
  answer: string
  /**
   * 타인이 선택한 카드 배경 CSS 값 (앞 카드). A안: 타인 답변의 bgValue(스와치 id)를
   * resolveBackground로 파생한 값이 주입된다. 미지정(로딩/0건) 시 CardPreview 기본 배경.
   */
  background?: string
  /** 타인 배경이 밝은지(글자 반전). 이미지/그라데이션의 밝기 판정을 전달받는다. */
  onLight?: boolean
  /** 뒤에 겹쳐 보이는 '내 카드'(장식용, aria-hidden)의 답변·배경·밝기. */
  myAnswer: string
  myBackground?: string
  myLight?: boolean
  /**
   * "다른 사람 카드 다운받기" 클릭 시 호출(선택). 실제 저장은 카드 영역을 이미지로
   * 캡쳐하는 방식으로 추후 구현한다. (지금은 완료 토스트만 노출)
   */
  onDownload?: () => void
  /** "내 카드 보기" — 내 카드 결과(#4)로 복귀. */
  onViewMyCard?: () => void
}

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

/** 안내 문구 앞 작은 스파클 아이콘 (Figma ⊛). */
function SparkleIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
      <path
        d="M5 0c.3 2.3 2.7 4.7 5 5-2.3.3-4.7 2.7-5 5-.3-2.3-2.7-4.7-5-5 2.3-.3 4.7-2.7 5-5Z"
        fill="currentColor"
      />
    </svg>
  )
}

/**
 * 화면 #5 타인 답변 보기 (Figma: iPhone 17 - 11 / 402×874 프레임 기준).
 * 같은 질문에 대한 다른 사람의 답변 카드 1개를 스택 형태로 노출한다.
 * [다른 사람 카드 다운받기] = 그 카드를 이미지로 캡쳐해 저장(추후 구현, 지금은 완료 토스트),
 * "내 카드 보기" = 내 카드 결과(#4)로 복귀.
 */
function OtherAnswer({
  question,
  date,
  answer,
  background,
  onLight,
  myAnswer,
  myBackground,
  myLight,
  onDownload,
  onViewMyCard,
}: OtherAnswerProps) {
  // 다운로드 시마다 증가 → Toast를 key로 remount 해 애니메이션/타이머를 재시작.
  const [toastId, setToastId] = useState(0)

  // TODO: 카드 영역을 이미지로 캡쳐해 저장 (html2canvas/html-to-image 등). 지금은 완료 토스트만.
  const handleDownload = () => {
    onDownload?.()
    setToastId((id) => id + 1)
  }

  return (
    <div className="screen other">
      <h1 className="other__title">
        같은 질문에 다른 누군가는
        <br />
        이렇게 답했어요
      </h1>

      <div className="other__content">
        {/* 카드 스택: 뒤(내 카드, 흐림) + 앞(타인 답변 — 타인이 고른 배경 반영) */}
        <div className="other__stack">
          <div className="other__card-behind" aria-hidden="true">
            <CardPreview question={question} answer={myAnswer} date={date} background={myBackground} onLight={myLight} />
          </div>
          {/* 흰색 발광(eclipse): 뒤 카드 상단을 흰 배경으로 자연스럽게 흐리며 타이틀 주변을 밝힌다. */}
          <span className="other__glow" aria-hidden="true" />
          <CardPreview question={question} answer={answer} date={date} background={background} onLight={onLight} />
        </div>

        {/* 내 답변도 노출될 수 있다는 안내 (Figma Frame 51) */}
        <p className="other__note">
          <SparkleIcon />내 답변도 다른 사람에게
          <br />
          무작위로 보일 수 있어요
        </p>

        {/* 액션: 타인 카드 다운로드(primary) / 내 카드 보기(텍스트 링크) */}
        <div className="other__actions">
          <Button onClick={handleDownload}>다른 사람 카드 다운하기</Button>
          <button type="button" className="other__link" onClick={onViewMyCard}>
            내 카드 보기
          </button>
        </div>
      </div>

      {/* 다운로드 완료 토스트 — 하단, 체크 아이콘 (#4와 동일) */}
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

export default OtherAnswer
