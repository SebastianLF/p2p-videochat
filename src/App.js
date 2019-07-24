import React from 'react'
import axios from 'axios'  
import Room from './Room.js'
import EnterRoomForm from "./roomForm.js"


class App extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      currentScreen: 'WhatIsYourRoomScreen',
      roomName: '',
      error: ''
    }
  }

  handleSubmit(e) {
    e.preventDefault()
    const nameInput = this.state.roomName

    // font-end input validation
    if(nameInput.length > 10) {
      this.setState({ error: "Your room name should contains 10 characters maximum" })
    }

    // API request: Join a room or create if it does not exists.
    axios.post( 'http://localhost:3001/rooms/add', { name: this.state.roomName, creator: this.getUsername() })
    .then( (response) => {
      
      if(response.status === 200 || response.status === 201) {
        this.setState({ currentScreen: 'ChatRoomScreen' })
      }
    })
    .catch( err => this.state.error )
  }

  handleChange(e) {
    this.setState({ roomName: e.target.value })
  }

  getUsername() {
    const key = 'username'

    if(!localStorage.getItem(key)) {
      localStorage.setItem('username', this.generateUniqueUsername())
    }

    return localStorage.getItem(key)
  }

  generateUniqueUsername() {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return '_' + Math.random().toString(36).substr(2, 9);
  }

  saveUsername(username) {
    
  }

  componentDidMount() {
    this.setState({ roomName: '' })
  }

  render() {
    if(this.state.currentScreen === 'ChatRoomScreen') {
      return <Room roomName={this.state.roomName}/>
    }

    return <EnterRoomForm handleSubmit={this.handleSubmit} handleChange={this.handleChange} error={this.state.error}/>
  }
  
}

export default App;
