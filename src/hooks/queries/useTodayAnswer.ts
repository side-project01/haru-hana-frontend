import { useQuery } from '@tanstack/react-query'
import { fetchTodayAnswer } from '../../api/questions'
import { getAnonId } from '../../lib/anonId'

/**
 * 오늘 저장된 답변 존재 여부 조회. (재진입 체크 2 — 완료 모달 판정)
 * 익명ID 기준으로 캐시하며, 서버 기록이 단일 진실이다.
 */
export function useTodayAnswer() {
  const anonId = getAnonId()
  return useQuery({
    queryKey: ['today-answer', anonId],
    queryFn: () => fetchTodayAnswer(anonId),
  })
}
