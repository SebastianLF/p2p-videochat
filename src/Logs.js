import React from 'react'

const Logs = ({ messages }) => {

  return (
    <div>
      {messages.map((message) => {
        let date = new Date(message.date)
        date = date.getHours() + ":" + date.getMinutes() + ' '

        return <li key={message._id}><span>{date}</span>{message.text}</li>
      })}
    </div>
  )
}

export default Logs
