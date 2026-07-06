import { useState } from 'react'
import Onboarding from './features/onboarding/Onboarding'
import TodayQuestion from './features/question/TodayQuestion'
import AnswerWrite from './features/answer/AnswerWrite'
import BackgroundSelect from './features/background/BackgroundSelect'
import CardResult from './features/result/CardResult'
import OtherAnswer from './features/others/OtherAnswer'
import type { Step } from './app/steps'
import './App.css'

function App() {
  const [step, setStep] = useState<Step>('onboarding')
  // 답변 작성 화면에 재노출할 질문. 오늘의 질문 로딩 완료 후 넘겨받는다.
  const [question, setQuestion] = useState('')
  // 배경 선택/카드 화면에 노출할 사용자의 답변.
  const [answer, setAnswer] = useState('')
  // 배경 선택(#3)에서 고른 카드 배경(CSS 값). 카드 결과(#4)에 반영한다.
  const [background, setBackground] = useState('')

  return (
    <div className="app">
      {step === 'onboarding' && <Onboarding onComplete={() => setStep('today')} />}

      {step === 'today' && (
        <TodayQuestion
          onNext={(q) => {
            setQuestion(q)
            setStep('answer')
          }}
          onNavigate={setStep}
        />
      )}

      {step === 'answer' && (
        <AnswerWrite
          question={question}
          onSubmit={(a) => {
            setAnswer(a)
            setStep('background')
          }}
        />
      )}

      {step === 'background' && (
        <BackgroundSelect
          question={question || undefined}
          answer={answer || undefined}
          onBack={() => setStep('answer')}
          onCreate={(bg) => {
            setBackground(bg)
            setStep('card')
          }}
        />
      )}

      {step === 'card' && (
        <CardResult
          question={question || undefined}
          answer={answer || undefined}
          background={background || undefined}
          onBack={() => setStep('background')}
          onViewOthers={() => setStep('others')}
          // TODO: 다운로드는 html2canvas 등으로 추후 연동
        />
      )}

      {step === 'others' && (
        <OtherAnswer
          question={question || undefined}
          background={background || undefined}
          // TODO: 타인 답변은 API(같은 질문의 무작위 답변 1개) 연동 후 주입 — 지금은 샘플 기본값
          onViewMyCard={() => setStep('card')}
        />
      )}
    </div>
  )
}

export default App
