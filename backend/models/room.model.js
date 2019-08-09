const mongoose = require('mongoose')

const Schema = mongoose.Schema

const roomSchema = new Schema({
  id: { type: String, required: true, unique: true, trim: true },
  participants: [],
  messages: [
    {
      text: String,
      sender: String,
      date: {
        type: Date,
        default: Date.now
      }
    }
  ]
})

const Room = mongoose.model('Room', roomSchema)

module.exports = Room
