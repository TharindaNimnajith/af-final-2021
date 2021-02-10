import React from 'react'
import Header from '../../../../components/header/header'
import Footer from '../../../../components/footer/footer'
import SingleQuizPage from './single-quiz-component/single-quiz-component'
import './single-quiz.css'

const SingleQuiz = props => {
  return (
    <div>
      <div>
        <Header/>
      </div>
      <h1 className='text-center text-uppercase mt-5 page-title'>
        Single Quiz
      </h1>
      <div className='container single-quiz-page'>
        <SingleQuizPage history={props.history}/>
      </div>
      <div>
        <Footer/>
      </div>
    </div>
  )
}

export default SingleQuiz
