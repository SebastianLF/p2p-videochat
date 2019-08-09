import React from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import ConversationBox from './ConversationBox'
import CONSTANTS from '../constants.js'
import './Room.css'
import NoMatch from './NoMatch'

class Room extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isValidId: false,
      loaded: false
    }
  }

  componentDidMount () {
    const url = `${CONSTANTS.API_URL}/rooms/${this.props.match.params.roomId}`

    axios({ url, headers: { 'Content-Type': 'application/json' } })
      .then(({ data }) => this.setState({ loaded: true, isValidId: Boolean(data) }))
      .catch((e) => console.error(e))
  }

  render () {
    if (!this.state.loaded) return null

    if (!this.state.isValidId) {
      return <NoMatch {...this.props} />
    }

    return (
      <div className='room'>
        <ConversationBox roomName={this.props.match.params.roomId} />
      </div>
    )
  }
}

export default Room
