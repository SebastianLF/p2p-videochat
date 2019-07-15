const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')


require('dotenv').config()

const app = express()
const port = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

const uri = process.env.MONGODB_URI
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true })
const connection = mongoose.connection
connection.once('open', () => {
    console.log('Connection to MONGODB established!');
})

const roomsRouter = require('./routes/rooms')

app.use('/rooms', roomsRouter)

/* app.get('/', function(req, res){
    res.send('Hello world!')
})

app.post('/rooms', function (req, res) {
    const roomName = req.body.body.roomName
    const people = 1
    
    // check if room is full.
    if (people >= 2) {
        res.json({
            type: 'FULL_ROOM'
        })
    }

    // check if room exists already.
    if(rooms.find( (r) => r === roomName ) && people < 2) {
        
        res.json({
            type: 'ALREADY_EXISTS'
        })
    }

    rooms = rooms.concat(roomName)
    console.log(rooms);
    
    res.status(201).json({
        type: 'ROOM_CREATED'
    })  
})*/

app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`)
})