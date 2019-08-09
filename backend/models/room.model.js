const mongoose = require('mongoose')

const Schema = mongoose.Schema

const roomSchema = new Schema({
  id: { type: String, required: true, unique: true, trim: true },
  creator: { type: String, required: true, trim: true },
  name: { type: String, trim: true },
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
}, { timestamps: true })

const Room = mongoose.model('Room', roomSchema)

module.exports = Room
