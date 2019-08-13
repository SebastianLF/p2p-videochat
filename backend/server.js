const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const helmet = require('helmet')
const dotenv = require('dotenv')
const axios = require('axios')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const port = process.env.PORT || 3001

dotenv.config()

app.use(helmet())

app.use(cors())
app.use(express.json())

const uri = process.env.MONGODB_URI
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true })
const connection = mongoose.connection
connection.once('open', () => {
  console.log('Connection to MONGODB established!')
})

const roomsRouter = require('./routes/rooms')(io)

app.use('/rooms', roomsRouter)

io.on('connection', function (socket) {
  console.log('A user has connected!', socket.id)
  socket.on('join', (roomId) => {
    socket.join(roomId, () => {
      const message = `A new user entered the room: ${roomId}`
      console.log(message)

      socket.on('sendMessage', (message) => {

        axios.post(`http://localhost:3001/rooms/${roomId}/messages/`, message)
          .then(({ data }) => {
            const { messages } = data
            io.in(roomId).emit('newMessage', messages)
          })
          .catch((err) => console.error(err))
      })
    })
  })

  socket.on('disconnect', function () {
    console.log('A user got disconnect!')
  })
})

server.listen(port, function () {
  console.log(`App is listening on port ${port}!`)
})
