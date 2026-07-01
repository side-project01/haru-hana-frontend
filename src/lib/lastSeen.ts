import type { DateKey } from '../types/question'

const STORAGE_KEY = 'daily-card:last-seen-date'

/** 마지막으로 본 질문의 날짜 키. 없으면 null. */
export function getLastSeenDate(): DateKey | null {
  return localStorage.getItem(STORAGE_KEY)
}

/** "마지막 본 날짜"를 오늘로 갱신. (새 질문 토스트 노출 후 호출) */
export function setLastSeenDate(dateKey: DateKey): void {
  localStorage.setItem(STORAGE_KEY, dateKey)
}
