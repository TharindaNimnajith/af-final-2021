const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment')
const uniqueValidator = require('mongoose-unique-validator')

const Schema = mongoose.Schema

const QuizzesSchema = new Schema({
  quizId: {
    type: Number,
    required: false,
    unique: true,
    trim: true
  },
  quizTitle: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  quizDescription: {
    type: String,
    required: true,
    unique: false,
    trim: true
  },
  questions: [{
    answers: [{
      type: String,
      required: false,
      unique: false,
      trim: true
    }],
    correctAnswer: {
      type: String,
      required: true,
      unique: false,
      trim: true
    }
  }]
}, {
  timestamps: true,
  collection: 'Quizzes'
})

QuizzesSchema.plugin(uniqueValidator)

autoIncrement.initialize(mongoose.connection)

QuizzesSchema.plugin(autoIncrement.plugin, {
  model: 'Quizzes',
  field: 'quizId',
  startAt: 1000,
  incrementBy: 1
})

module.exports = mongoose.model('Quizzes', QuizzesSchema)
