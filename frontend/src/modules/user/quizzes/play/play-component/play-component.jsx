import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router'
import axios from 'axios'
import {isEmpty} from '../../../../../helpers/common.helpers'
import {quizzesApi} from '../../../../../config/api.config'
import './play-component.css'
import Loader from "../../../../../components/loader/loader";
import ButtonComponent from "../../../../../components/button/button";
import TextField from "../../../../../components/text-field/text-field";

const PlayComponent = props => {
  const [successModal, setSuccessModal] = useState(false)
  const [message, setMessage] = useState('')

  const [data, setData] = useState(null)

  const helperAnswer1 = 'Please enter the answer for question 1.'
  const helperAnswer2 = 'Please enter the answer for question 2.'
  const helperAnswer3 = 'Please enter the answer for question 3.'

  const [loader, setLoader] = useState(false)

  const [userAnswer1, setUserAnswer1] = useState('')
  const [userAnswer2, setUserAnswer2] = useState('')
  const [userAnswer3, setUserAnswer3] = useState('')

  const [errorAnswer1, setErrorAnswer1] = useState('')
  const [errorAnswer2, setErrorAnswer2] = useState('')
  const [errorAnswer3, setErrorAnswer3] = useState('')

  const [answer1Valid, setAnswer1Valid] = useState(false)
  const [answer2Valid, setAnswer2Valid] = useState(false)
  const [answer3Valid, setAnswer3Valid] = useState(false)

  const [error, setError] = useState('')

  const {
    id
  } = useParams()

  useEffect(() => {
    loadData().then(() => {
    })
  }, [])

  const loadData = async () => {
    setLoader(true)
    axios.get(`${quizzesApi}quizzes/${id}`).then(res => {
      setData(res.data.quiz)
      setLoader(false)
    }).catch(error => {
      setError('An unexpected error occurred. Please try again later.')
      setLoader(false)
      console.error(error)
    })
  }

  const onChangeAnswer1 = async event => {
    setUserAnswer1(event.value)
    setAnswer1Valid(event.eventInfo.target.validity.valid && !await isEmpty(event.value))
    setErrorAnswer1('')
    if (!event.eventInfo.target.validity.valid) {
      setErrorAnswer1('Please enter a valid answer.')
    }
  }

  const onChangeAnswer2 = async event => {
    setUserAnswer2(event.value)
    setAnswer2Valid(event.eventInfo.target.validity.valid && !await isEmpty(event.value))
    setErrorAnswer2('')
    if (!event.eventInfo.target.validity.valid) {
      setErrorAnswer2('Please enter a valid answer.')
    }
  }

  const onChangeAnswer3 = async event => {
    setUserAnswer3(event.value)
    setAnswer3Valid(event.eventInfo.target.validity.valid && !await isEmpty(event.value))
    setErrorAnswer3('')
    if (!event.eventInfo.target.validity.valid) {
      setErrorAnswer3('Please enter a valid answer.')
    }
  }

  function isDisabled() {
    return !answer1Valid || !answer2Valid || !answer3Valid
  }

  const toggleSuccessModal = async () => {
    setSuccessModal(!successModal)
  }

  const onClick = async () => {
    props.history.push('/quizzes')
  }

  const onSubmit = async () => {

  }

  return (
    <div>
      {
        loader ? (
          <Loader/>
        ) : null
      }
      <div>
        <div>
          <div>
            <TextField isRequired={true}
                       labelText={'Answer for Question 1'}
                       name={'answer1'}
                       value={userAnswer1}
                       errorText={errorAnswer1}
                       helperText={helperAnswer1}
                       maxLength={50}
                       onChangeFn={event => onChangeAnswer1(event)}/>
          </div>
          <TextField isRequired={true}
                     labelText={'Answer for Question 2'}
                     name={'answer2'}
                     value={userAnswer2}
                     errorText={errorAnswer2}
                     helperText={helperAnswer2}
                     maxLength={50}
                     onChangeFn={event => onChangeAnswer2(event)}/>
        </div>
        <div>
          <TextField isRequired={true}
                     labelText={'Answer for Question 3'}
                     name={'answer3'}
                     value={userAnswer3}
                     errorText={errorAnswer3}
                     helperText={helperAnswer3}
                     maxLength={50}
                     onChangeFn={event => onChangeAnswer3(event)}/>
        </div>
        <div className='text-center mt-4 mb-3'>
          <ButtonComponent btnText={'Submit'}
                           isFullWidth={false}
                           elementStyle={'submit-btn'}
                           disabled={isDisabled()}
                           onClickFn={onSubmit}/>
        </div>
      </div>
    </div>
  )
}

export default PlayComponent
