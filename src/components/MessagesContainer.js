import React from 'react'
import Message from './Message.js'

import './MessageContainer.css'

const MessagesContainer = ({ messages }) => {
  return (
    <div className='messages'>
      {messages && messages.map((message) => <Message key={message._id} message={message} />)}
    </div>
  )
}

export default MessagesContainer
