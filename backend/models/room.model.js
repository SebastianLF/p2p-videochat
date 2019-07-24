const mongoose = require('mongoose')

const Schema = mongoose.Schema

const roomSchema = new Schema({
    name: { type: String, required: true, unique: true, trim: true },
    messages: [
        { 
            text: String,
            date: {
                type: Date,
                default: Date.now
            }
        }
    ]
}, { timestamps: true })

const Room = mongoose.model('Room', roomSchema)

module.exports = Room