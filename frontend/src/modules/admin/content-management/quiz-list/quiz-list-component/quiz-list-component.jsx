import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {quizzesApi, usersApi} from '../../../../../config/api.config'
import Loader from '../../../../../components/loader/loader'
import {Card, CardDeck, CardFooter, CardText, CardTitle, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap'
import ButtonComponent from '../../../../../components/button/button'
import './quiz-list-component.css'

const QuizListComponent = () => {
  const [loader, setLoader] = useState(false)
  const [successModal, setSuccessModal] = useState(false)
  const [modal, setModal] = useState(false)
  const [message, setMessage] = useState('')
  const [data, setData] = useState(null)
  const [deleteId, setDeleteId] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    loadData().then(() => {
    })
  }, [])

  const loadData = async () => {
    setLoader(true)
    axios.get(`${quizzesApi}quizzes`).then(res => {
      setData(res.data.quizList)
      setLoader(false)
    }).catch(error => {
      setError('An unexpected error occurred. Please try again later.')
      setLoader(false)
      console.error(error)
    })
  }

  const onDelete = async id => {
    setDeleteId(id)
    await toggle()
  }

  const toggle = async () => {
    setModal(!modal)
  }

  const toggleSuccessModal = async () => {
    setSuccessModal(!successModal)
  }

  const confirmDelete = async () => {
    setError('')
    setLoader(true)
    axios.delete(`${usersApi}quizzes/${deleteId}`).then(res => {
      if (res.data.status === 200) {
        setData(data.filter(item => item._id !== deleteId))
        setMessage(res.data.message)
        toggle()
        toggleSuccessModal()
      } else {
        toggle()
        setError('An unexpected error occurred. Please try again later.')
        console.error(error)
      }
      setLoader(false)
    }).catch(error => {
      toggle()
      setError('An unexpected error occurred. Please try again later.')
      setLoader(false)
      console.error(error)
    })
  }

  return (
    <div>
      {
        loader ? (
          <Loader/>
        ) : null
      }
      <div>
        <Modal isOpen={successModal}
               toggle={toggleSuccessModal}
               className='modal-close'>
          <ModalHeader toggle={toggleSuccessModal}
                       className='text-uppercase title'>
            Success!
          </ModalHeader>
          <ModalBody>
            {message}
          </ModalBody>
          <ModalFooter>
            <ButtonComponent btnText={'Ok'}
                             isFullWidth={false}
                             elementStyle={'ok-button'}
                             disabled={false}
                             onClickFn={toggleSuccessModal}/>
          </ModalFooter>
        </Modal>
      </div>
      <div>
        <Modal isOpen={modal}
               toggle={toggle}
               className='modal-close'>
          <ModalHeader toggle={toggle}
                       className='text-uppercase'>
            Delete Quiz
          </ModalHeader>
          <ModalBody>
            Are you sure you want to delete this quiz?
          </ModalBody>
          <ModalFooter>
            <ButtonComponent btnText={'Yes'}
                             isFullWidth={false}
                             elementStyle={'yes-button'}
                             disabled={false}
                             onClickFn={confirmDelete}/>
            <ButtonComponent btnText={'No'}
                             isFullWidth={false}
                             elementStyle={'no-button'}
                             disabled={false}
                             onClickFn={toggle}/>
          </ModalFooter>
        </Modal>
      </div>
      <div>
        <small>
          {
            error ? (
              <span className='error'>
                {error}
              </span>
            ) : null
          }
        </small>
      </div>
      <div>
        <CardDeck>
          {
            data && data.map((item) => {
              return (
                <Card body
                      key={item._id}>
                  <CardTitle tag='h5'>
                    {data.quizTitle}
                  </CardTitle>
                  <CardText>
                    {data.quizDescription}
                  </CardText>
                  <CardFooter>
                    <i className='fas fa-trash-alt delete'
                       title='Delete Student'
                       onClick={() => onDelete(item._id)}/>
                  </CardFooter>
                </Card>
              )
            })
          }
        </CardDeck>
      </div>
    </div>
  )
}

export default QuizListComponent
