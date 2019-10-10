import React from 'react'
import { getUsername } from '../authentication.js'
import faker from 'faker'

import './Message.css'

// let date = new Date(message.date)
// date = date.getHours() + ":" + date.getMinutes() + ' '

const Message = ({ message }) => {
  const isSender = () => message.sender === getUsername().id
  const isInfoMessage = () => message.sender === 'server'

  return (
    <li className={isSender() ? 'message sent' : isInfoMessage() ? 'message-info' : 'message replies'}>
      <img src={isSender() ? faker.avatar.image() : faker.avatar.image()} alt='sender' />
      <p>{message.text}</p>
    </li>
  )
}

export default Message
