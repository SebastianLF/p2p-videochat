import React from 'react'
import { getUsername } from '../storage.js'

import './Message.css'

// let date = new Date(message.date)
// date = date.getHours() + ":" + date.getMinutes() + ' '

const Message = ({ message }) => {
  const isSender = () => message.sender === getUsername()
  const isInfoMessage = () => message.sender === 'server'

  return (
    <div className={isSender() ? 'message sent' : isInfoMessage() ? 'message-info' : 'message replies'}>
      <img src={isSender() ? 'http://emilcarlsson.se/assets/mikeross.png' : 'http://emilcarlsson.se/assets/harveyspecter.png'} alt='sender' />
      <p>{message.text}</p>
    </div>
  )
}

export default Message
