const router = require('express').Router()
let Room = require('../models/room.model')

router.route('/').get((req, res) => {
    Room.find()
        .then((rooms) => res.json(rooms))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/add').post((req, res) => {
    const name = req.body.name

    Room.findOne({ name: name })
        .then( result => {
            if(result) {
                res.status(200).json(result)
            } else {
                const newRoom = new Room({ name, participants: [], messages: [] })

                newRoom.save()
                .then(() => res.status(201).json(newRoom))
                .catch(err => res.status(400).json('Error: ' + err))
            }
        })
})

router.route('/add/:id').get((req, res) => {
    Room.findById(req.params.id)
    .then((room) => res.json(room))
    .catch( err => res.status(400).json('Error: ' + err))
})

router.route('/delete/:id').delete((req, res) => {
    Room.findByIdAndDelete(req.params.id)
    .then((room) => res.json('Room deleted'))
    .catch( err => res.status(400).json('Error: ' + err))
})

router.route('/update/:id').post( (req, res) => {
    Room.findById(req.params.id)
    .then((room) => {
        room.name = req.body.name

        room.save()
            .then(() => res.json('Room updated!'))
            .catch(err => res.status(400).json('Error: ' + err))
    })
    .catch((req, res) => res.json('Error: ' + err))
})

router.route('/:roomName/messages/add').post( (req, res) => {
    const roomName = req.params.roomName
    const message = req.body.message
    
    Room.findOne({ name: roomName })
    .then((room) => {
        const messages = room.messages
        const newMessage = {
            text: message
        }
        messages.push(newMessage)

        room.save()
            .then((room) => res.json(room))
            .catch(err => res.status(400).json('Error: ' + err))
    })
    .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/:roomName/messages/').get( (req, res) => {
    const roomName = req.params.roomName

    Room.findOne({ name: roomName })
        .then((room) => res.json(room.messages))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/:roomName/messages/:messageId/').put( (req, res) => {
    Room.findOne({ name: roomName })
        .then((room) => res.json(room.messages))
        .catch(err => res.status(400).json('Error: ' + err))
})

module.exports = router