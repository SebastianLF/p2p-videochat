import React from 'react'
import Input from './Input.js'
import MessagesContainer from './MessagesContainer.js'
import axios from 'axios'
import { getUsername } from '../storage.js'
import socket from '../socket.js'

import './ConversationBox.css'
import logo from '../assets/logo.png'

class ConversationBox extends React.Component {
  constructor (props) {
    super(props)

    this.handleTyping = this.handleTyping.bind(this)
    this.sendMessage = this.sendMessage.bind(this)
    this.state = {
      logs: [],
      message: '',
      error: ''
    }
  }

  handleTyping (e) {
    this.setState({ message: e.target.value })
  }

  sendMessage (e) {
    e.preventDefault()

    if (this.state.message !== '') {
      const url = `http://localhost:3001/rooms/${this.props.roomName}/messages/add`

      axios.post(url, { message: this.state.message, sender: getUsername() })
        .then(({ data }) => {
          // socket.emit('sendMessage', data)
          this.setState({ logs: this.state.logs.concat(data), message: '' })
        })
        .catch(err => this.setState({ error: err }))
    }
  }

  getMessages () {
    const url = `http://localhost:3001/rooms/${this.props.roomName}/messages/`

    axios(url)
      .then(({ data }) => this.setState({ logs: this.state.logs.concat(data) }))
      .catch((err) => this.setState({ error: err }))
  }

  componentDidMount () {
    socket.emit('join', this.props.roomName)
    socket.on('joined', msg => this.setState({ logs: this.state.logs.concat(msg) }))

    this.getMessages()
  }

  render () {
    return (
      <div className='conversation-box'>
        <div className='room-profile'>
          <img src={logo} alt='room' />
          <p>{this.props.roomName}</p>
        </div>
        <MessagesContainer messages={this.state.logs} />
        <Input
          value={this.state.message}
          handleTyping={this.handleTyping}
          sendMessage={this.sendMessage}
          error={this.state.err} />
      </div>
    )
  }
}

export default ConversationBox
