import React from 'react'
import ConversationBox from './ConversationBox'

const Room = ({ roomName }) => {
  const style = {
    width: '300px',
    border: '1px solid #ccc',
    borderRadius: '5px'
  }

  const titleStyle = { borderBottom: '1px solid #ccc' }

  return (
    <div style={style}>
      <h1 style={titleStyle}>{`Room: ${roomName}`}</h1>
      <ConversationBox roomName={roomName} />
    </div>
  )
}

export default Room
