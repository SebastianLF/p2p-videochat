import React from 'react'
import Input from './Input.js'
import MessagesContainer from './MessagesContainer.js'
import io from 'socket.io-client'
import axios from 'axios'

import './ConversationBox.css'
import logo from './images/logo.png'

const socket = io.connect('http://localhost:3001')

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

      axios.post(url, { message: this.state.message, sender: 'user1' })
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
    socket.on('message', (message) => {
      this.setState({ logs: [...this.state.logs, message], message: '' })
    })

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
