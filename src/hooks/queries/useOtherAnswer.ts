import { useQuery } from '@tanstack/react-query'
import { fetchOtherAnswer } from '../../api/questions'

/**
 * 같은 질문의 타인 답변 1건 조회 (5번 화면). 본인 제외는 서버가 담당한다.
 * 타인 답변 화면에 진입했고 유효한 questionId가 있을 때만 조회한다(enabled).
 */
export function useOtherAnswer(questionId: number, enabled: boolean) {
  return useQuery({
    queryKey: ['other-answer', questionId],
    queryFn: () => fetchOtherAnswer(questionId),
    enabled: enabled && questionId > 0,
  })
}
