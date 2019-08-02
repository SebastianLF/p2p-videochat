import React from 'react'
import { getUsername } from './localStorage.js'

const myStyle = {
  textAlign: 'right',
  maxWidth: '300px',
  borderBottom: 'solid 1px #ccc'
}

const addresseeStyle = {
  textAlign: 'left',
  color: '#c0392b',
  borderBottom: 'solid 1px #ccc'
}

// let date = new Date(message.date)
// date = date.getHours() + ":" + date.getMinutes() + ' '

const Message = ({ message }) => {
  const isOwner = (sender) => sender === getUsername('username')

  return (
    <div style={isOwner(message.sender) ? myStyle : addresseeStyle} key={message._id}>
      <h4> {isOwner(message.sender) ? 'Vous avez dit' : `${message.sender} a dit:`} </h4>
      <p>{message.text}</p>
    </div>
  )
}

export default Message
