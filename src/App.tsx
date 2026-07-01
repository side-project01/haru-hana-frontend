import { useState } from 'react'
import Onboarding from './features/onboarding/Onboarding'
import TodayQuestion from './features/question/TodayQuestion'
import type { Step } from './app/steps'
import './App.css'

function App() {
  const [step, setStep] = useState<Step>('onboarding')

  return (
    <div className="app">
      {step === 'onboarding' && <Onboarding onComplete={() => setStep('today')} />}

      {step === 'today' && (
        <TodayQuestion
          onNext={() => {
            // TODO: 답변 작성(2번) 화면 연결 예정
          }}
          onNavigate={setStep}
        />
      )}

      {/* TODO: 카드 결과(4번) 화면 구현 예정 — 현재는 플레이스홀더 */}
      {step === 'card' && (
        <div className="app__placeholder">
          <p>카드 결과 화면(4번)은 준비 중이에요.</p>
          <button type="button" onClick={() => setStep('today')}>
            돌아가기
          </button>
        </div>
      )}
    </div>
  )
}

export default App
