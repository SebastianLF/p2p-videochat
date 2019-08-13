import React from 'react'
import axios from 'axios'
import ConversationBox from './ConversationBox'
import SidePanel from './SidePanel'
import CONSTANTS from '../constants.js'
import './Room.css'
import NoMatch from './NoMatch'
import Loader from './Loader'

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
    }, 2000)
  }

  getRoomData () {
    const url = `${CONSTANTS.API_URL}/rooms/${this.props.match.params.roomId}`

    axios({ url, headers: { 'Content-Type': 'application/json' } })
      .then(({ data }) => this.setState({
        loaded: true,
        isValidUrl: Boolean(data),
        room: data })
      )
      .catch((e) => console.error(e))
  }

  render () {
    if (!this.state.loaded) return <Loader />

    if (!this.state.isValidUrl) {
      return <NoMatch {...this.props} />
    }

    return (
      <div className='room'>
        <SidePanel participants={this.state.room.participants} />
        <ConversationBox roomName={this.props.match.params.roomId} />
      </div>
    )
  }
}

export default Room
