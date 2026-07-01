/** 서버 기준(KST 자정) 날짜 키. 예: '2026-12-05' */
export type DateKey = string

/** 오늘의 질문 (서버가 날짜별로 선정해 내려줌) */
export interface TodayQuestion {
  dateKey: DateKey
  questionId: string
  text: string
}

/** 카드 결과(4번 화면)에서 필요한 최소 정보 */
export interface AnswerCard {
  answer: string
  /** 배경 식별자 (컬러/그라디언트/이미지) */
  background: string
}

/**
 * 오늘(익명ID 기준) 저장된 답변 존재 여부.
 * exists=true 이면 1번 화면에서 완료 모달을 띄운다.
 */
export interface TodayAnswer {
  exists: boolean
  card?: AnswerCard
}
