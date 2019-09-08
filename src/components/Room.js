import React, { useState, useEffect } from 'react'
import axios from 'axios'
import socket from '../socket.js'
import ConversationBox from './ConversationBox'
import SidePanel from './SidePanel'
import './Room.css'
import NoMatch from './NoMatch'
import Loader from './Loader'
import { isAuthed } from '../authentication'
import { API_URL } from '../constants'

function Room(props) {
  const [isLoading, setIsLoading] = useState(true)
  const [isValid, setIsValid] = useState(false)
  const [participants, setParticipants] = useState([])
  const getRoomData = (roomId) => axios.get(`${API_URL}/rooms/${roomId}`)

  useEffect(() => {
    setTimeout(() =>
      getRoomData(props.match.params.roomId)
        .then(({ data }) => {
          setIsLoading(false)
          setIsValid(true)
        })
        .catch(e => {
          setIsLoading(false)
          setIsValid(false)
        })
      , 1000)
  }, [props.match.params.roomId])

  if (isLoading) return <Loader />

  if (!isValid) return <NoMatch {...props} />

  return (
    <div className='room'>
      <SidePanel participants={participants} />
      <ConversationBox roomId={props.match.params.roomId} />
    </div>
  )
}

/* class Room extends React.Component {
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
      </div>
    )
  }
}
 */
export default Room
