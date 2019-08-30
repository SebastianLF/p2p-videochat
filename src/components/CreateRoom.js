import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import constants from '../constants'
import { saveUsername, getUsername, isAuthenticated } from '../authentication'
import './CreateRoom.css'
import logo from '../assets/logo.png'

function CreateRoom() {
  const [room, setRoom] = useState({})

  return (
    <div className='create-room'>
      <img src={logo} alt='logo' />
      <h2>GLADIUS</h2>
      <Link to='/defaultroom'>CREATE A ROOM</Link>
    </div>
  )
}

/* class CreateRoom extends React.Component {
  constructor (props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {
      roomIsLoaded: false,
      room: {},
      error: ''
    }
  }

  handleSubmit (e) {
    e.preventDefault()

    axios.post(`${constants.API_URL}/rooms/`, { user: getUsername() })
      .then(({ data }) => {
        if (!isAuthenticated()) {
          saveUsername(data.participants[0])
        }

        this.setState({ roomIsLoaded: true, room: data })
      })
      .catch(error => this.setState({ error }))
  }

  render () {
    if (this.state.roomIsLoaded) return <Redirect to={{ pathname: `/${this.state.room.id}` }} />

    return (
      <div className='create-room'>
        <img src={logo} alt='logo' />
        <h2>GLADIUS</h2>
        <form onSubmit={this.handleSubmit}>
          <div className='error' />
          <input type='submit' value='CREATE A NEW ROOM!' />
        </form>
      </div>
    )
  }
} */

export default CreateRoom
