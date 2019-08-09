const router = require('express').Router()
const Room = require('../models/room.model')

function roomsRouter (io) {
  const generateUniqueId = () => {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return Math.random().toString(36).substr(2, 12)
  }

  router.route('/').get((req, res) => {
    Room.find()
      .then((rooms) => res.json(rooms))
      .catch(err => res.status(400).json('Error: ' + err))
  })

  router.route('/').post((req, res) => {
    console.log(req.body.user)

    const newUser = req.body.user || {
      id: generateUniqueId(),
      name: `User${generateUniqueId()}`
    }

    const newRoom = new Room({ id: generateUniqueId(), messages: [], participants: [newUser] })

    newRoom.save()
      .then((room) => res.status(201).json(room))
      .catch(err => res.status(400).json(err))
  })

  router.route('/:roomId').get((req, res) => {
    Room.findOne({ id: req.params.roomId })
      .then((room) => res.json(room))
      .catch(err => res.status(400).json('Error: ' + err))
  })

  // ---------------------------------------------------------------------------

  router.route('/:roomName').get((req, res) => {
    Room.findOne({ name: req.params.roomName }).select('-_id name participants')
      .then(room => {
        res.json(room)
      })
      .catch(err => res.status(400).json('Error: ' + err))
  })

  router.route('/add').post((req, res) => {
    const name = req.body.roomName && req.body.roomName.toString().trim()
    const user = req.body.userName && req.body.userName.toString().trim()

    Room.findOne({ name: name })
      .then(roomFound => {
        if (roomFound) {
          io.sockets.to(roomFound).emit('join', user)
          res.status(200).json(roomFound)
        } else {
          const newRoom = new Room({ creator: user, name, messages: [] })

          newRoom.save()
            .then(() => res.status(201).json(newRoom))
            .catch(err => res.status(400).json('Error: ' + err))
        }
      })
  })

  router.route('/add/:id').get((req, res) => {
    Room.findById(req.params.id)
      .then((room) => res.json(room))
      .catch(err => res.status(400).json('Error: ' + err))
  })

  router.route('/delete/:id').delete((req, res) => {
    Room.findByIdAndDelete(req.params.id)
      .then((room) => res.json('Room deleted'))
      .catch(err => res.status(400).json('Error: ' + err))
  })

  router.route('/update/:id').post((req, res) => {
    Room.findById(req.params.id)
      .then((room) => {
        room.name = req.body.name

        room.save()
          .then(() => res.json('Room updated!'))
          .catch(err => res.status(400).json('Error: ' + err))
      })
      .catch((err) => res.json('Error: ' + err))
  })

  router.route('/:roomName/messages/add').post((req, res) => {
    const roomName = req.params.roomName
    const message = req.body.message
    const sender = req.body.sender

    Room.findOne({ name: roomName })
      .then((room) => {
        const messages = room.messages
        const newMessage = {
          sender: sender,
          text: message
        }
        messages.push(newMessage)
        room.save()
          .then((room) => {
            res.status(201).json(newMessage)
          })
          .catch(err => res.status(400).json('Error: ' + err))
      })
      .catch(err => res.status(400).json('Error: ' + err))
  })

  router.route('/:roomName/messages/').get((req, res) => {
    const roomName = req.params.roomName

    Room.findOne({ name: roomName })
      .then((room) => res.json(room.messages))
      .catch(err => res.status(400).json('Error: ' + err))
  })

  router.route('/:roomName/messages/:messageId/').put((req, res) => {
    Room.findOne({ name: req.params.roomName })
      .then((room) => res.json(room.messages))
      .catch(err => res.status(400).json('Error: ' + err))
  })

  router.route('/:roomName/participants/add').post((req, res) => {
    Room.findOne({ name: req.params.roomName })
      .then(room => {
        room.participants.push(req.body.participantId)
        room.save()
          .then(() => {
            res.status(200).end()
          })
          .catch(err => res.status(500).json('Error: ' + err))
      })
      .catch(err => res.status(400).json('Error: ' + err))
  })

  return router
}

module.exports = roomsRouter
