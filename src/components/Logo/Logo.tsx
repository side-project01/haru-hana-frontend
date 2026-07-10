import logoMark from '../../assets/logo.svg'
import './Logo.css'

/**
 * 서비스 브랜드 로고 (마크 + "하루 하나" 워드마크). 여러 화면에서 재사용.
 * 마크는 `src/assets/logo.svg` **단일 소스**를 공유한다 (파비콘도 동일 파일 참조 — index.html).
 */
function Logo() {
  return (
    <div className="logo">
      <img className="logo__mark" src={logoMark} alt="" aria-hidden="true" />
      <span className="logo__text">하루 하나</span>
    </div>
  )
}

export default Logo
