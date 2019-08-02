import React from 'react'
import Message from './Message.js'

const Logs = ({ messages }) => {
  return (
    <div>
      {messages.map((message) => <Message message={message} />)}
    </div>
  )
}

export default Logs
