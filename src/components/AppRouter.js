import React from 'react'
import './AppRouter.css'
import logo from '../assets/logo.png'
import { Link } from 'react-router-dom'

const AppRouter = ({ roomName, userName, handleChange, handleSubmit, error }) => {
  return (
    <div className='login'>
      <img src={logo} alt='logo' />
      <h2>GLADIUS</h2>
      <form onSubmit={handleSubmit}>
        <button><Link to='/create'>CREATE ROOM</Link></button>
        <button><Link to='/join'>JOIN ROOM</Link></button>
      </form>
    </div>
  )
}

export default AppRouter
