import React from 'react'

import './Message.css'

// let date = new Date(message.date)
// date = date.getHours() + ":" + date.getMinutes() + ' '

const Message = ({ message }) => {
  // const isOwner = (sender) => sender === 'user3'
  return (
    <div className={message.sender === 'user3' ? 'message sent' : 'message replies'} key={message._id}>
      <img src={message.sender === 'user3' ? 'http://emilcarlsson.se/assets/mikeross.png' : 'http://emilcarlsson.se/assets/harveyspecter.png'} alt='sender' />
      {/* <h4> {isOwner(message.sender) ? 'Vous avez dit' : `${message.sender} a dit:`} </h4> */}
      <p>{message.text}</p>
    </div>
  )
}

export default Message
