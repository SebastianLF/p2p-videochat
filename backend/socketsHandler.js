const axios = require('axios')

async function postMessage (roomId, message) {
  const { data } = await axios.post(`http://localhost:3001/rooms/${roomId}/messages/`, message)

  return data.messages
}

async function postParticipants (user) {
  const { data } = await axios.post(`http://localhost:3001/rooms/${roomId}/participants/`, user)

  return data.participants
}

function onConnect (socket) {
  console.log(`${socket.id} is now connected!`)

  socket.on('joinRoom', (roomId, user) => {
    socket.join(roomId, () => {
      const participants = postParticipants(user)
      socket.to(roomId).emit('newParticipant', participants)
      console.log(`A new user entered the room: ${roomId}`)
    })
  })

  socket.on('sendMessage', (message, roomId) => {
    const messages = postMessage(roomId, message)
    socket.in(roomId).emit('newMessage', messages)
  })
}

function socketsHandler (server) {
  const io = require('socket.io')(server)

  io.on('connect', onConnect)

  /* io.on('connection', function (socket) {
    console.log('A user has connected!', socket.id)
    socket.on('join', (roomId) => {
      socket.join(roomId, () => {
        console.log(`A new user entered the room: ${roomId}`)

        socket.on('sendMessage', (message) => {
          axios.post(`http://localhost:3001/rooms/${roomId}/messages/`, message)
            .then(({ data }) => {
              const { messages } = data
              io.in(roomId).emit('newMessage', messages)
            })
            .catch((err) => console.error(err))
        })

        socket.on('joinRoom', (user) => {
          axios.post(`http://localhost:3001/rooms/${roomId}/participants/`, user)
            .then(({ data }) => {
              const { participants } = data

              const participantFound = participants.find(participant => participant.id === user.id)

              if (!participantFound) {
                io.to(roomId).emit('newParticipant', participants)
              }
            })
            .catch((err) => console.error(err))
        })
      })

      socket.on('disconnect', function () {
        console.log('A user got disconnect!')
      })
    })
  }) */
}

module.exports = socketsHandler
