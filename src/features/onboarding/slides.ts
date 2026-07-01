import hero1 from '../../assets/onboarding/hero-1.svg'
import hero2Ellipse from '../../assets/onboarding/hero-2-ellipse.svg'
import hero2Polygon from '../../assets/onboarding/hero-2-polygon.svg'

/**
 * 히어로 그래픽 1개의 배치 정보.
 * left/top/width 는 402x874(Figma 프레임) 기준 비율(%)이며,
 * 각 값은 노드 중심 좌표와 blur 포함 export 크기로부터 산출했다.
 */
export interface HeroImage {
  src: string
  alt: string
  /** 컨테이너 너비(402) 대비 표시 폭 % */
  width: number
  /** 노드 중심 X (402 기준) % */
  left: number
  /** 노드 중심 Y (874 기준) % */
  top: number
}

export interface OnboardingSlide {
  id: string
  title: string
  subtitle?: string
  /** 콘텐츠 블록 내부 gap(px) — Figma 값 */
  contentGap: number
  heroes: HeroImage[]
}

export const SLIDES: OnboardingSlide[] = [
  {
    id: 'record',
    title: '매일 하나의 질문,\n나만의 카드로 기록해요.',
    contentGap: 20,
    heroes: [
      // Gradient (3:34): 270x275 @ x66 y78, export 661px → 중심(201, 215.9)
      { src: hero1, alt: '', width: 164.4, left: 50.0, top: 24.7 },
    ],
  },
  {
    id: 'make',
    title: '질문에 답하고\n배경을 골라 카드를 만들어요',
    subtitle: '하루에 한 번, 나를 돌아보는 시간',
    contentGap: 12,
    heroes: [
      // Ellipse (4:66): 253x253 @ x67 y128, export 653px → 중심(193.5, 254.5)
      { src: hero2Ellipse, alt: '', width: 162.4, left: 48.1, top: 29.1 },
      // Polygon (4:67): 255x254 @ x108 y94, export 521px → 중심(235.5, 221)
      { src: hero2Polygon, alt: '', width: 129.6, left: 58.6, top: 25.3 },
    ],
  },
]
