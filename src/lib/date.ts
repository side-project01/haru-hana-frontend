import type { DateKey } from '../types/question'

/**
 * KST(UTC+9) 기준 오늘의 날짜 키(YYYY-MM-DD)를 만든다.
 *
 * 주의: 실제 운영에서 날짜의 단일 진실은 **서버가 내려준 dateKey**다.
 * (기기 시계 조작·타임존 차이 방지) 이 함수는 백엔드가 없는 현재,
 * 목 API가 "오늘"을 흉내 내기 위해서만 사용한다.
 */
export function todayKeyKST(): DateKey {
  const now = new Date()
  // UTC epoch + 9시간 → KST 벽시계, 그 날짜 부분만 취한다.
  const kst = new Date(now.getTime() + 9 * 60 * 60 * 1000)
  return kst.toISOString().slice(0, 10)
}
