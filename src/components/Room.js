import React from 'react'
import ConversationBox from './ConversationBox'
import './Room.css'

const Room = ({ match }) => {
  return (
    <div className='room'>
      <ConversationBox roomName={match.params.roomId} />
    </div>
  )
}

export default Room
