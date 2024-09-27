import { useEffect, useReducer } from 'react'

import viteLogo from '/vite.svg'
import './index.css'
import Header from './Header'
import Main from './component/Main'
import Loader from './Loader'
import Error from './Error'
import StartScreen from './component/StartScreen'
import Questions from './component/Questions'
import Progress from './component/Progress'
import FinishQuiz from './component/FinishQuiz'

const TIME_PER_QUESTION=30;

const intialState = {
  questions: [],
  status: 'loading',  //'loading', 'error', 'ready', 'active', 'finished'
  index: 0,
  answer: null,
  allAnswerArray: [],
  points: 0,
  highscore:0,
  attempt:0,
  remainingSeconds:null,
}

const reducer = function (state, action) {
  switch (action.type) {
    case 'intializeQuestion':
      return { ...state, questions: action.payload, status: 'ready' }
    case 'dataFailed':
      return { ...state, status: 'error' }
    case 'startQuiz':
      return { ...state, status: 'active', remainingSeconds:state.questions?.length*TIME_PER_QUESTION}
    case 'answerQuestion':
      return { ...state, answer: action.payload, allAnswerArray:[...state.allAnswerArray, action.payload] }
    case 'nextQuestion':
      return{ ...state, index: state.index + 1, answer: null }
    case 'finishQuiz':
      return{ ...state, status: 'finished' }
    case 'updatePoints':
      const question = state.questions[state.index];
      return { ...state, answer: action.payload, points: action.payload === question.correctOption ? state.points + question.points : state.points }
    case 'setHighScore':
      return {...state, highscore: action.payload}
    case 'restart':
      return {...intialState, attempt: state.attempt+1 , highscore:state.highscore}
    case 'timerTick':
      return {...state, remainingSeconds:state.remainingSeconds-1, status: state.remainingSeconds===0?'finished':state.status}
    default:
      throw new Error('Error Unkown Action!!!')
  }
}

function App() {
  const [
    {
      questions,
      status,
      index,
      answer,
      points,
      highscore,
      attempt,
      remainingSeconds,
      allAnswerArray
    }
    , dispatch] = useReducer(reducer, intialState)

  const maxPoints = questions.reduce((prev,curr)=>(
    prev+curr.points
  ),0)

  useEffect(() => {
    fetch(`http://localhost:8000/questions`)
      .then((result) => result.json())
      .then((data) => {
        const randomizedQuestionArray = data.sort((a, b) => 0.5 - Math.random())
        dispatch({ type: 'intializeQuestion', payload: randomizedQuestionArray })
      })
      .catch((err) => dispatch({ type: 'dataFailed' }))
  }, [attempt])


  return (
    <div className="app">
      <Header />

      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && <StartScreen numberOfQuestions={questions.length} startQuiz={() => dispatch({ type: 'startQuiz' })} highscore={highscore} />}
        {status === 'active' &&
          <>
            <Progress numberOfQuestions={questions.length} points={points} index={index} maxPoints={maxPoints} />
            <Questions question={questions[index]} answer={answer} dispatch={dispatch} index={index} numberOfQuestions={questions.length} remainingSeconds={remainingSeconds} />
          </>
        }
        {status === 'finished' && <FinishQuiz points={points} maxPoints={maxPoints} highscore={highscore} dispatch={dispatch} allAnswerArray={allAnswerArray} questions={questions} />}
      </Main>

    </div>
  )
}

export default App
