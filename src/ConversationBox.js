import React from 'react'
import Input from './Input.js'
import Logs from './Logs.js'
import axios from 'axios'
import io from 'socket.io-client'
import { getUsername } from './localStorage.js'

const socket = io.connect('http://localhost:3001')

class Chatbox extends React.Component {
  constructor(props) {
    super(props)
    
    this.handleTyping = this.handleTyping.bind(this)
    this.sendMessage = this.sendMessage.bind(this)
    this.state = {
      logs: [],
      message: '',
      error: ''
    }
  }

  handleTyping(e) {
    this.setState({ message: e.target.value })
  }

  sendMessage(e){
    e.preventDefault()

    if(this.state.message !== '') {
      axios.post(`http://localhost:3001/rooms/${this.props.roomName}/messages/add`, {
      message: this.state.message,
      sender: getUsername('username')
      })
      .then(({ data }) => {
        const messages = data.messages
        
        this.setState({ logs: this.state.logs.concat(messages[messages.length - 1]), message: '' })
      })
      .catch((err) => this.setState({ error: err }))
    }
  }

  getMessages() {
    axios.get(`http://localhost:3001/rooms/${this.props.roomName}/messages/`)
    .then((response) => {
      
      this.setState({ logs: this.state.logs.concat(response.data) })
    })
    .catch((err) => this.setState({ error: err }))
  }

  componentDidMount() {
    socket.emit('join', this.props.roomName)
    socket.on('message', (message) => {
      this.setState({ logs: [...this.state.logs, message], message: '' })
    })

    this.getMessages()
  }

  render() {
    
    return (
      <div>
        <Logs messages={this.state.logs}/>
        <Input 
          value={this.state.message} 
          handleTyping={this.handleTyping} 
          sendMessage={this.sendMessage} 
          error={this.state.err}/>
      </div>
    )
  }

}

export default Chatbox
