import React from 'react'
import axios from 'axios'
import constants from '../constants'
import './CreateRoom.css'
import logo from '../assets/logo.png'

class CreateRoom extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      error: ''
    }
  }

  handleChange (e) {
    this.setState({ username: e.target.value })
  }

  handleSubmit (e) {
    e.preventDefault()

    if (this.state.username !== '') {
      axios.post(`${constants.API_URL}/rooms/`, { username: this.state.username })
    }
  }

  componentDidMount () {
    console.log(constants.API_URL)
  }

  render () {
    return (
      <div className='create-room'>
        <img src={logo} alt='logo' />
        <h2>GLADIUS</h2>
        <form onSubmit={this.handleSubmit}>
          <input type='text' name='username' value={this.state.username} placeholder='Your nickname' onChange={this.handleChange} />
          <div className='error'>{ this.state.error !== '' ? this.state.error : '' }</div>
          <input type='submit' value='CREATE' />
        </form>
      </div>
    )
  }
}

export default CreateRoom
