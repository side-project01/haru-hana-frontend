import { QueryClient } from '@tanstack/react-query'

/** 앱 전역 QueryClient. 서버 데이터 로딩/에러/캐싱을 일관 처리한다. */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // 오늘의 질문/답변은 날짜 단위로 안정적이므로 짧은 리페치 억제.
      staleTime: 60_000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})
