import React from 'react'
import axios from 'axios'
import socket from '../socket.js'
import ConversationBox from './ConversationBox'
import SidePanel from './SidePanel'
import CONSTANTS from '../constants.js'
import './Room.css'
import NoMatch from './NoMatch'
import Loader from './Loader'
import { getUsername } from '../authentication.js'

class Room extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isValidUrl: false,
      loaded: false,
      room: {}
    }
  }

  componentDidMount () {
    window.setTimeout(() => {
      this.getRoomData()

      socket.on('newParticipant', (participants) => this.setState({ room: { participants } }))
    }, 2000)
  }

  getRoomData () {
    const url = `${CONSTANTS.API_URL}/rooms/${this.props.match.params.roomId}`

    axios({ url, headers: { 'Content-Type': 'application/json' } })
      .then(({ data }) => {
        this.setState({
          loaded: true,
          isValidUrl: Boolean(data),
          room: data
        })

        this.joinRoom(data.id, getUsername())
      })
      .catch((e) => console.error(e))
  }

  joinRoom (user) {
    socket.emit('joinRoom', this.state.room.id, user)
  }

  render () {
    if (!this.state.loaded) return <Loader />

    if (!this.state.isValidUrl) {
      return <NoMatch {...this.props} />
    }

    console.log(this.state.room.participants)
    

    return (
      <div className='room'>
        <SidePanel participants={this.state.room.participants} />
        <ConversationBox roomName={this.props.match.params.roomId} />
      </div>
    )
  }
}

export default Room
