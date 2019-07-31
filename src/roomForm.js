import React from 'react'

const RoomForm = ({ handleChange, handleSubmit, error }) => {
  return (
    <div>
      <h2>SKYPE CLONE</h2>
      <form onSubmit={handleSubmit}>
        <input type='text' placeholder="Type a room's name" onChange={handleChange} />
        <input type='submit' value='JOIN' />
      </form>
      <div>{ error !== '' ? error : '' }</div>
    </div>
  )
}

export default RoomForm
