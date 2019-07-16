const mongoose = require('mongoose')

const Schema = mongoose.Schema

const roomSchema = new Schema({
    name: { type: String, required: true, unique: true },
    participants: { type: Array, required: true },
    messages: { type: Array, required: true }
}, { timestamps: true })

const Room = mongoose.model('Room', roomSchema)

module.exports = Room