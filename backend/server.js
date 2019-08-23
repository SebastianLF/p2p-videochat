const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const helmet = require('helmet')
const dotenv = require('dotenv')
const app = express()
const server = require('http').Server(app)
const morgan = require('morgan')
const roomsRouter = require('./routes/rooms')

if (process.env.NODE_ENV !== 'production') {
  morgan('dev')
  dotenv.config()
}

app.use(helmet())
app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useCreateIndex: true })
const connection = mongoose.connection
connection.once('open', () => {
  console.log('Connection to MONGODB established!')
})

require('./socketsHandler')(server)

app.use('/rooms', roomsRouter)

server.listen(process.env.PORT, function () {
  console.log(`App is listening on port ${process.env.PORT}!`)
})
