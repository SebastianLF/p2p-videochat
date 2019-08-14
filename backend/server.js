const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const helmet = require('helmet')
const dotenv = require('dotenv')
const axios = require('axios')
const app = express()
const server = require('http').Server(app)

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

const roomsRouter = require('./routes/rooms')

require('./socketsHandler')(server)

app.use('/rooms', roomsRouter)

server.listen(port, function () {
  console.log(`App is listening on port ${port}!`)
})
