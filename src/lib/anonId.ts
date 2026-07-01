const STORAGE_KEY = 'daily-card:anon-id'

/**
 * localStorage 기반 익명 식별자. 없으면 새로 발급한다.
 *
 * 한계(best-effort): 스토리지 삭제·다른 브라우저·시크릿 모드에서는 새 ID가
 * 발급되어 1일 1회 제약이 우회된다. 실제 강제는 서버의 `(익명ID, 날짜)`
 * 유니크 제약이 담당하며, 이 값은 보장이 아니라 최선의 식별 수단일 뿐이다.
 */
export function getAnonId(): string {
  let id = localStorage.getItem(STORAGE_KEY)
  if (!id) {
    id = crypto.randomUUID()
    localStorage.setItem(STORAGE_KEY, id)
  }
  return id
}
