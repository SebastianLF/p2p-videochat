const mongoose = require('mongoose')

const Schema = mongoose.Schema

const roomSchema = new Schema({
  participants: [{ name: { type: String, required: true, trim: true }, avatar: { type: String, required: true, trim: true } }],
  messages: [
    {
      id: String,
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
