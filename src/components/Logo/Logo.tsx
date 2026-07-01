import './Logo.css'

/** 서비스 브랜드 로고 (마크 + "하루 하나" 워드마크). 여러 화면에서 재사용. */
function Logo() {
  return (
    <div className="logo">
      <span className="logo__mark" aria-hidden="true" />
      <span className="logo__text">하루 하나</span>
    </div>
  )
}

export default Logo
