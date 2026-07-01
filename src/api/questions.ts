import { todayKeyKST } from '../lib/date'
import type { TodayAnswer, TodayQuestion } from '../types/question'

/**
 * ⚠️ 목(mock) API — 백엔드가 아직 없어 샘플 데이터를 지연과 함께 반환한다.
 * 서버 준비 시 각 함수 본문만 아래 주석의 실제 엔드포인트 호출로 교체하면 된다.
 * (React Query의 로딩/에러/캐싱 흐름은 목에서도 그대로 동작한다.)
 */

const delay = (ms = 500) => new Promise((r) => setTimeout(r, ms))

/** 완료 모달 흐름을 눈으로 확인할 때 true 로 토글 (오늘 이미 답변한 상태). */
const MOCK_ALREADY_ANSWERED = false

/**
 * 오늘의 질문 조회.
 * 실제: `GET /questions/today` → { dateKey, questionId, text }
 * (서버가 KST 자정 기준으로 선정, 같은 날 모든 사용자 동일 질문)
 */
export async function fetchTodayQuestion(): Promise<TodayQuestion> {
  await delay()
  return {
    dateKey: todayKeyKST(),
    questionId: 'q-sample',
    text: '오늘 하루 가장 행복했던 순간은?',
  }
}

/**
 * 오늘(익명ID 기준) 저장된 답변 존재 여부 조회.
 * 실제: `GET /answers/today` (익명ID 헤더) → 있으면 카드, 없으면 404/null.
 * 404/null 은 exists=false 로 매핑한다. (409 중복은 저장 화면 몫)
 */
export async function fetchTodayAnswer(anonId: string): Promise<TodayAnswer> {
  void anonId // 실제 구현에서 익명ID 헤더로 전달
  await delay()
  if (MOCK_ALREADY_ANSWERED) {
    return {
      exists: true,
      card: { answer: '친구와 오랜만에 통화한 순간', background: 'pink' },
    }
  }
  return { exists: false }
}
