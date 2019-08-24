const router = require('express').Router()
const Room = require('../models/room.model')

const generateUniqueId = () => {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return Math.random().toString(36).substr(2, 12)
}

router.route('/').get(async (req, res) => {
  const rooms = await Room.find().exec()
  res.json(rooms)
})

router.route('/').post(async (req, res) => {
  try {
    const roomCreated = await Room.create({ participants: [req.body] })
    return res.json(roomCreated)
  } catch (error) {
    return res.json({ message: error._message })
  }
})

router.route('/:roomId').get(async (req, res) => {
  const roomFound = await Room.findById(req.params.roomId).select('-__v').exec()
  res.json(roomFound)
})

router.route('/:roomId/messages/').post(async (req, res) => {
  const roomId = req.params.roomId
  const text = req.body.message
  const sender = req.body.sender.id

  const roomUpdated = await Room.findOneAndUpdate({ _id: roomId }, { $push: { messages: { text, sender } } }, { new: true }).exec()

  if (!roomUpdated) return res.status(400).json({ message: 'Room does not exist.' })

  res.status(200).json(roomUpdated.messages)
})

router.route('/:roomId/messages/').get((req, res) => {
  const roomId = req.params.roomId

  Room.findOne({ id: roomId })
    .then((room) => {
      res.json(room.messages)
    })
    .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/:roomId/participants/').post((req, res) => {
  const roomId = req.params.roomId
  const newParticipant = req.body.participant

  // TODO

  Room.findOne({ id: roomId })
    .then(room => {
      if (room === null) {
        const participantFound = room.participants.find(participant => newParticipant.id === participant.id)

        if (!participantFound) {
          room.participants.push(newParticipant)
          room.save()
            .then((room) => {
              res.status(200).json(room.participants)
            })
            .catch(err => res.status(500).json('Error: ' + err))
        }

        res.status(200).json(null)
      }

      res.status(200).json(null)
    })
    .catch(err => res.status(400).json('Error: ' + err))
})

// ---------------------------------------------------------------------------

/* router.route('/:roomName').get((req, res) => {
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
  }) */

module.exports = router
