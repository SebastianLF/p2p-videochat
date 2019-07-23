import React from 'react'

const Logs = ({ messages }) => {

  return (
    <div>
      {messages.map((message) => <li key={message._id}><span>{message.date}</span>{message.text}</li>)}
    </div>
  )
}

export default Logs
