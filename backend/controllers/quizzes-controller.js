const QuizModel = require('../models/quizzes.model')

const addQuiz = async (req, res) => {
  let existingQuiz

  let {
    quizTitle,
    quizDescription,
    questions
  } = req.body

  try {
    existingQuiz = await QuizModel.findOne({
      quizTitle: quizTitle
    })
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }

  if (existingQuiz) {
    res.send({
      status: 409,
      message: 'A quiz with the same title already exists.'
    })
  }

  const newQuiz = new QuizModel({
    quizTitle,
    quizDescription,
    questions
  })

  try {
    await newQuiz.save()
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }

  res.send({
    status: 201,
    message: 'New quiz added successfully!'
  })
}

const updateQuiz = async (req, res) => {
  let quiz
  let existingQuiz

  const {
    id
  } = req.params

  const {
    quizTitle,
    quizDescription,
    questions
  } = req.body

  try {
    quiz = await QuizModel.findById(id)
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }

  try {
    existingQuiz = await QuizModel.findOne({
      quizTitle: quizTitle
    })
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }

  if (existingQuiz && quizTitle !== quiz.quizTitle) {
    res.send({
      status: 409,
      message: 'A quiz with the same title already exists.'
    })
  }

  quiz.quizTitle = quizTitle
  quiz.quizDescription = quizDescription
  quiz.questions = questions

  try {
    await quiz.save()
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }

  res.send({
    status: 200,
    message: 'Quiz updated successfully!'
  })
}

const deleteQuiz = async (req, res) => {
  let quiz

  const {
    id
  } = req.params

  try {
    quiz = await QuizModel.findById(id)
    await quiz.remove()
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }

  res.send({
    status: 200,
    message: 'Quiz deleted successfully!'
  })
}

const getQuiz = async (req, res) => {
  let quiz

  const {
    id
  } = req.params

  try {
    quiz = await QuizModel.findById(id)
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }

  res.send({
    status: 200,
    quiz: quiz
  })
}

const getQuizList = async (req, res) => {
  let quizList

  try {
    quizList = await QuizModel.find()
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }

  res.send({
    status: 200,
    quizList: quizList
  })
}

exports.addQuiz = addQuiz
exports.updateQuiz = updateQuiz
exports.deleteQuiz = deleteQuiz
exports.getQuiz = getQuiz
exports.getQuizList = getQuizList
