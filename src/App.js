import React from 'react'
import Room from './Room.js'
import Login from './Login.js'
import axios from 'axios'
import './App.css'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      currentScreen: 'ChatRoomScreen',
      roomName: 'room3',
      userName: 'user3',
      error: ''
    }
  }

  handleSubmit (e) {
    e.preventDefault()
    const roomName = this.state.roomName.toString().trim()
    const userName = this.state.userName.toString().trim()

    // font-end input validation
    if (roomName && roomName.length <= 8 && userName && userName.length <= 8) {
      const data = {
        roomName,
        userName
      }
      const url = 'http://localhost:3001/rooms/add'
      // API request: Join a room or create if it does not exists.
      axios.post(url, data)
        .then(data => this.setState({ currentScreen: 'ChatRoomScreen' }))
        .catch(err => this.setState({ error: err.toString() }))
    } else {
      this.setState({ error: 'Room name or user name are incorrect!' })
    }
  }

  handleChange (e) {
    if (e.target.name === 'username') this.setState({ userName: e.target.value })
    if (e.target.name === 'room') this.setState({ roomName: e.target.value })
  }

  componentDidMount () {
    // this.setState({ roomName: '', userName: '' })
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
