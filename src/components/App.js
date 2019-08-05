import React from 'react'
import Room from './Room.js'
import Login from './Login.js'
import axios from 'axios'
import { saveUsername } from '../storage.js'
import './App.css'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      currentScreen: 'EnterUsernameAndRoomScreen',
      roomName: '',
      userName: '',
      error: ''
    }
  }

  handleSubmit (e) {
    e.preventDefault()
    const roomName = this.state.roomName.toString().trim()
    const userName = this.state.userName.toString().trim()

    // font-end input validation
    if (roomName && roomName.length <= 8 && userName && userName.length <= 8) {
      // back-end validation
      axios.get(`http://localhost:3001/rooms/${roomName}/`)
        .then(({ data }) => {
          if (data === null) {
            axios.post('http://localhost:3001/rooms/add', { roomName, userName })
              .then(data => {
                saveUsername(userName)

                this.setState({ currentScreen: 'ChatRoomScreen' })
              })
              .catch(err => this.setState({ error: err.toString() }))
          } else if (data.participants.length === 2) {
            this.setState({ error: 'Sorry! This room is actually full.' })
          } else if (data.participants.includes(userName)) {
            this.setState({ error: 'User name is already taken.' })
          } else {
            axios.post(`http://localhost:3001/rooms/${roomName}/participants/add/`, { userName })
              .then(({ data }) => {
                saveUsername(userName)

                this.setState({ currentScreen: 'ChatRoomScreen' })
              })
              .catch(err => this.setState({ error: err.toString() }))
          }
        })
        .catch(err => this.setState({ error: err.toString() }))
    } else {
      this.setState({ error: 'Please type a user name and a room name' })
    }
  }

  handleChange (e) {
    if (e.target.name === 'username') this.setState({ userName: e.target.value })
    if (e.target.name === 'room') this.setState({ roomName: e.target.value })
  }

  componentDidMount () {
    this.setState({ roomName: '', userName: '' })
  }

  render () {
    if (this.state.currentScreen === 'ChatRoomScreen') {
      return <Room roomName={this.state.roomName} />
    }

    return (
      <div className='app'>
        <Login userName={this.state.userName} roomName={this.state.roomName} handleSubmit={this.handleSubmit} handleChange={this.handleChange} error={this.state.error} />
      </div>
    )
  }
}

export default App
