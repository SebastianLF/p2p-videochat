import React from 'react'
import { getUsername } from '../authentication.js'

import './Message.css'

// let date = new Date(message.date)
// date = date.getHours() + ":" + date.getMinutes() + ' '

const Message = ({ message }) => {
  const isSender = () => message.sender === getUsername().id
  const isInfoMessage = () => message.sender === 'server'

  return (
    <li className={isSender() ? 'message sent' : isInfoMessage() ? 'message-info' : 'message replies'}>
      <img src={isSender() ? 'http://emilcarlsson.se/assets/mikeross.png' : 'http://emilcarlsson.se/assets/harveyspecter.png'} alt='sender' />
      <p>{message.text}</p>
    </li>
  )
}

export default Message
