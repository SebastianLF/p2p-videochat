const router = require('express').Router()
let Room = require('../models/room.model')

router.route('/').get((req, res) => {
    Room.find()
        .then((rooms) => res.json(rooms))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/add').post((req, res) => {
    const name = req.body.name

    const newRoom = new Room({name, participants: [], log: []})

    newRoom.save()
    .then(() => res.json('Room created!'))
    .catch(err => res.status(400).json('Error: ' + err))
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

module.exports = router