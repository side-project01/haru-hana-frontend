/**
 * 서버 통신 fetch 래퍼. 실 백엔드 연동 시 API 모듈에서 사용한다.
 *
 * 현재는 백엔드가 없어 `api/*`가 목(mock) 데이터를 반환하므로 직접 쓰이지
 * 않지만, 실 서버 전환 대비 골격으로 둔다. (엔드포인트 형태·에러 규약 고정)
 */
const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? ''

/** 서버 통신 실패를 표준화한 에러. status가 있으면 HTTP 상태 코드. */
export class ApiError extends Error {
  readonly status?: number

  constructor(message: string, status?: number) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

export async function apiGet<T>(path: string): Promise<T> {
  let res: Response
  try {
    res = await fetch(`${BASE_URL}${path}`, {
      headers: { Accept: 'application/json' },
    })
  } catch {
    throw new ApiError('네트워크 연결을 확인해주세요.')
  }
  if (!res.ok) {
    throw new ApiError(`요청에 실패했어요. (${res.status})`, res.status)
  }
  return res.json() as Promise<T>
}
