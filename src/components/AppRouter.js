import React from 'react'
import { Link } from 'react-router-dom'
import './AppRouter.css'
import logo from '../assets/logo.png'

const AppRouter = ({ roomName, userName, handleChange, handleSubmit, error }) => {
  return (
    <div className='login'>
      <img src={logo} alt='logo' />
      <h2>GLADIUS</h2>
      <form onSubmit={handleSubmit}>
        <Link to='/create'>CREATE ROOM</Link>
        <Link to='/join'>JOIN ROOM</Link>
      </form>
    </div>
  )
}

export default AppRouter
