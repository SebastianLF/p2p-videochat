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
    
    axios.post( 'http://localhost:3001/rooms/add', {
      name: this.state.roomName
    })
    .then( ({data}) => {
      this.setState({ currentScreen: 'ChatRoomScreen' })
    })
    .catch( err => this.state.error ) 
  }

  handleChange(e) {
    this.setState({ roomName: e.target.value })
  }

  render() {
    if(this.state.currentScreen === 'ChatRoomScreen') {
      return <Room roomName={this.state.roomName}/>
    }

    return <EnterRoomForm handleSubmit={this.handleSubmit} handleChange={this.handleChange} error={this.state.error}/>
  }
  
}

export default App;
