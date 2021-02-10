const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment')
const uniqueValidator = require('mongoose-unique-validator')

const Schema = mongoose.Schema

const days = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
]

const roomTypes = [
  'Lecture Hall',
  'Laboratory'
]

const RoomsSchema = new Schema({
  roomId: {
    type: Number,
    required: false,
    unique: true,
    trim: true
  },
  roomName: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  buildingName: {
    type: String,
    required: true,
    unique: false,
    trim: true
  },
  roomType: {
    type: String,
    enum: roomTypes,
    required: true,
    unique: false,
    trim: true
  },
  roomCapacity: {
    type: Number,
    required: true,
    unique: false,
    trim: true
  },
  unavailability: [{
    day: {
      type: String,
      enum: days,
      required: false,
      unique: false,
      trim: true
    },
    startTime: {
      type: String,
      required: false,
      unique: false,
      trim: true
    },
    endTime: {
      type: String,
      required: false,
      unique: false,
      trim: true
    }
  }]
}, {
  timestamps: true,
  collection: 'Rooms'
})

RoomsSchema.plugin(uniqueValidator)

autoIncrement.initialize(mongoose.connection)

RoomsSchema.plugin(autoIncrement.plugin, {
  model: 'Rooms',
  field: 'roomId',
  startAt: 1000,
  incrementBy: 1
})

module.exports = mongoose.model('Rooms', RoomsSchema)
