import React from 'react'
import { getUsername } from './localStorage.js'

const Logs = ({ messages }) => {

  const isOwner = (sender) => sender === getUsername('username')

  return (
    <div>
      {messages.map((message) => {
        // let date = new Date(message.date)
        // date = date.getHours() + ":" + date.getMinutes() + ' '
        const myStyle = {
          textAlign: "right",
          maxWidth: "300px"
        }

        const hisStyle = {
          textAlign: "left",
          color: 'red'
        }

        return (
          <div style={ isOwner(message.sender) ? myStyle : hisStyle } key={message._id}>
            <h4> {isOwner(message.sender) ? 'Vous avez dit' : `${message.sender} a dit:`} </h4>
            <p>{message.text}</p>
          </div>
        )
      })}
    </div>
  )
}

export default Logs
