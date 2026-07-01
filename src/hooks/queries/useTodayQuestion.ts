import { useQuery } from '@tanstack/react-query'
import { fetchTodayQuestion } from '../../api/questions'

/** 오늘의 질문 조회. (1번 화면 진입 시) */
export function useTodayQuestion() {
  return useQuery({
    queryKey: ['today-question'],
    queryFn: fetchTodayQuestion,
  })
}
