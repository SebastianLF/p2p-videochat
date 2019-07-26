const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv').config()

const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const port = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

const uri = process.env.MONGODB_URI
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true })
const connection = mongoose.connection
connection.once('open', () => {
    console.log('Connection to MONGODB established!');
})

const roomsRouter = require('./routes/rooms')(io)

app.use('/rooms', roomsRouter)

io.on('connection', function (socket) {
    console.log('A user has connected!');
    
    socket.on('join', function(room) {
        socket.join(room)
        console.log('A user joined room: ' + room);
    })

    socket.on('disconnect', function () {
        console.log('A user got disconnect!');
    })
})

server.listen(port, function () {
    console.log(`App is listening on port ${port}!`)
})
