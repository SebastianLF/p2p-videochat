import React from 'react'
import Message from './Message.js'

import './MessageContainer.css'

const Logs = ({ messages }) => {
  return (
    <div className='messages'>
      {messages.map((message) => <Message key={message._id} message={message} />)}
    </div>
  )
}

export default Logs
