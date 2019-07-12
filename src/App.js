import React from 'react';
import Room from './Room.js'
import EnterRoomForm from "./roomForm.js";

class App extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      currentScreen: 'WhatIsYourRoomScreen',
      roomName: ''
    }
  }

  handleSubmit(e) {
    e.preventDefault()
    
    if (this.state.roomName === 'test') {
      this.setState({ currentScreen: 'ChatRoomScreen' })
    }
  }

  handleChange(e) {
    console.log(e.target.value);
    
    this.setState({ roomName: e.target.value })
  }

  render() {
    if(this.state.currentScreen === 'ChatRoomScreen') {
      return <Room roomName={this.state.roomName}/>
    }

    return <EnterRoomForm handleSubmit={this.handleSubmit} handleChange={this.handleChange}/>
  }
  
}

export default App;
