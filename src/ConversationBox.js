import React from 'react'
import Input from './Input.js'
import MessagesContainer from './MessagesContainer.js'
import io from 'socket.io-client'
import { getUsername } from './localStorage.js'

const socket = io.connect('http://localhost:3001')

class Chatbox extends React.Component {
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

    const message = {
      message: this.state.message,
      sender: getUsername('username')
    }

    if (this.state.message !== '') {
      const url = `http://localhost:3001/rooms/${this.props.roomName}/messages/add`

      window.fetch(url, {
        method: 'POST',
        body: JSON.stringify(message),
        headers: { 'Content-Type': 'application/json' }
      })
        .then(res => res.json())
        .then(res => console.log(res))
        .catch(err => this.setState({ error: err }))
    }
  }

  getMessages () {
    const url = `http://localhost:3001/rooms/${this.props.roomName}/messages/`

    window.fetch(url)
      .then(res => res.json())
      .then(res => this.setState({ logs: this.state.logs.concat(res) }))
      .catch((err) => this.setState({ error: err }))
  }

  componentDidMount () {
    socket.on('message', (message) => {
      this.setState({ logs: [...this.state.logs, message], message: '' })
    })

    this.getMessages()
  }

  render () {
    const style = { height: '400px', overflow: 'auto' }

    return (
      <div style={style}>
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

export default Chatbox
