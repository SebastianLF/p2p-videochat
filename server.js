const express = require('express')
const app = express()
const bodyParser = require('body-parser')


let rooms = ['test']
let people = [2]
const jsonParser = bodyParser.json()
const urlEncodedPArser = bodyParser.urlencoded({ extended: false })

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
    res.setHeader("Access-Control-Allow-Headers", "Authorization, Cache-Control, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    next()
})

app.get('/', function(req, res){
    res.send('Hello world!')
})

app.post('/rooms', jsonParser, function (req, res) {
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
})

app.listen(3001, function () {
    console.log('Example app listening on port 3001!')
})