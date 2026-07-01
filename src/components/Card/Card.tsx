import './Card.css'

interface CardProps {
  /** 카드 배경(컬러/그라디언트 CSS 값). 기본 핑크. (Figma #FFECEC) */
  background?: string
  /** 카드 그래픽 이미지 URL */
  image?: string
  imageAlt?: string
}

/**
 * 정사각 카드 프리뷰 (Figma 29:1587 — 319x319, radius 20).
 * 배경 위에 이미지를 얹은 형태로, 배경 선택(3번)·결과(4번)에서도 재사용.
 */
function Card({ background = '#FFECEC', image, imageAlt = '' }: CardProps) {
  return (
    <div className="card" style={{ background }}>
      {image && <img className="card__graphic" src={image} alt={imageAlt} aria-hidden={!imageAlt} />}
    </div>
  )
}

export default Card
