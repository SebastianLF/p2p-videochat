import React from 'react'
import './Login.css'
import logo from '../assets/logo.png'

const JoinRoom = (props) => {

  const hasParam = props.location.state ? props.location.state.hasParam : false

  const roomName = hasParam ? props.location.state.roomId : ''
  const userName = ''
  const error = ''
  const handleChange = () => 'ok'
  const handleSubmit = () => 'ok'

  return (
    <div className='login'>
      <img src={logo} alt='logo' />
      <h2>GLADIUS</h2>
      <form onSubmit={handleSubmit}>
        <label>Username:
          <input type='text' name='username' value={userName} placeholder='Your nickname' onChange={handleChange} />
        </label>
        <label>Room ID:
          <input type='text' name='room' value={roomName} placeholder='Room id' onChange={handleChange} />
        </label>
        <div className='error'>{ error !== '' ? error : '' }</div>
        <input type='submit' value='JOIN ROOM' />
      </form>
    </div>
  )
}

export default JoinRoom
