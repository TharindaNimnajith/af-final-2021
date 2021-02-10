import React from 'react'
import Header from '../../../../components/header/header'
import Footer from '../../../../components/footer/footer'
import AddQuizComponent from './add-quiz-component/add-quiz-component'
import './add-quiz.css'

const AddQuiz = () => {
  return (
    <div>
      <div>
        <Header/>
      </div>
      <h1 className='text-center text-uppercase mt-5 page-title'>
        Add Quiz
      </h1>
      <div className='container add-quiz-page'>
        <AddQuizComponent/>
      </div>
      <div>
        <Footer/>
      </div>
    </div>
  )
}

export default AddQuiz
