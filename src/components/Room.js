import React from 'react'
import ConversationBox from './ConversationBox'
import './Room.css'

const Room = ({ roomName }) => {
  return (
    <div className='room'>
      <ConversationBox roomName={roomName} />
    </div>
  )
}

export default Room
