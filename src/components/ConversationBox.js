import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy } from '@fortawesome/free-solid-svg-icons'
import Input from './Input.js'
import MessagesContainer from './MessagesContainer.js'
import axios from 'axios'
import { API_URL } from '../constants'
import { getUsername } from '../authentication.js'
import socket from '../socket.js'
import './ConversationBox.css'


function ConversationBox(props) {
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState('')
  const [error, setError] = useState('')

  function postMessage(e) {
    e.preventDefault()
    return axios.post(`${API_URL}/rooms/${props.roomId}/messages/`, { text: inputMessage, sender: getUsername() })
      .then(({ data }) => setMessages(data.messages))
      .catch(e => setError(e.errorMessage))
  }

  return (
    <div className='conversation-box'>
      <div className='room-profile'>
        <div className='meta'>
          <div className='id'>
            <div className='room-id'><span>ROOM</span> {props.roomId}</div>
          </div>
          <div className='url'>
            <div className='address'>
              <input value={window.location.href} readOnly />
            </div>
          </div>
        </div>
      </div>
      <MessagesContainer messages={messages} />
      <Input
        value={inputMessage}
        handleTyping={(e) => setInputMessage(e.target.value)}
        sendMessage={postMessage}
        error={error} />
    </div>
  )
}

/* class ConversationBox extends React.Component {
  constructor(props) {
    super(props)
    this.urlRef = React.createRef()

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

  sendMessage(e) {
    e.preventDefault()

    if (this.state.message !== '') {
      console.log('ok')
      socket.emit('sendMessage', { message: this.state.message, sender: getUsername() })
      this.setState({ message: '' })
    }

    /* if (this.state.message !== '') {
      const url = `http://localhost:3001/rooms/${this.props.roomName}/messages/`

      axios.post(url, { message: this.state.message, sender: getUsername() })
        .then(({ data }) => {
          // socket.emit('sendMessage', data)
          console.log(data)
          this.setState({ logs: [].concat(data.messages), message: '' })
        })
        .catch(err => this.setState({ error: err }))
    } 
  }

  getMessages() {
    const url = `http://localhost:3001/rooms/${this.props.roomName}/messages/`

    axios(url)
      .then(({ data }) => this.setState({ logs: this.state.logs.concat(data) }))
      .catch((err) => this.setState({ error: err }))
  }

  componentDidMount() {
    socket.emit('join', this.props.roomName)
    // socket.on('joined', msg => this.setState({ logs: this.state.logs.concat(msg) }))
    socket.on('newMessage', (messages) => {
      this.setState({ logs: [].concat(messages) })
    })

    this.getMessages()
  }

  copyToClipboard(e) {
    this.urlRef.current.select()
    document.execCommand('copy')
  }

  render() {
    return (
      <div className='conversation-box'>
        <div className='room-profile'>
          <div className='meta'>
            <div className='id'>
              <div className='room-id'><span>ROOM</span> {this.props.roomName}</div>
            </div>
            <div className='url'>
              <div className='address'>
                <input ref={this.urlRef} value={window.location.href} readOnly />
              </div>
              <button onClick={this.copyToClipboard.bind(this)}><FontAwesomeIcon icon={faCopy} /></button>
            </div>
          </div>
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
} */

export default ConversationBox
