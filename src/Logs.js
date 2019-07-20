import React from 'react'

function Logs({ messages }) {
  return (
    <div>
      {messages.map((message) => <li key={message._id}>{message.text}</li>)}
    </div>
  )
}

export default Logs
