import React from 'react'
import './Login.css'
import logo from '../assets/logo.png'

const Login = ({ roomName, userName, handleChange, handleSubmit, error }) => {
  return (
    <div className='login'>
      <img src={logo} alt='logo' />
      <h2>GLADIUS</h2>
      <form onSubmit={handleSubmit}>
        <input type='text' name='username' value={userName} placeholder='Enter a username' onChange={handleChange} />
        <input type='text' name='room' value={roomName} placeholder="Type a room's name" onChange={handleChange} />
        <div className='error'>{ error !== '' ? error : '' }</div>
        <input type='submit' value='JOIN' />
      </form>
    </div>
  )
}

export default Login
